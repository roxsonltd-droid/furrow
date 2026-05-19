/**
 * Furrow registration / waitlist — POST /api/waitlist (Resend) or Mailchimp fallback.
 */
(function initFurrowWaitlist() {
	const form = document.getElementById('signup-form');
	const statusDiv = document.getElementById('form-status');
	if (!form || !statusDiv) return;

	let mailchimpUrl = null;
	let mailchimpHidden = null;

	const lang = () => (window.FurrowI18n?.getLang?.() === 'ru' ? 'ru' : 'en');
	const msg = (key) => window.FURROW_I18N?.[lang()]?.[key] || key;

	function showStatus(className, text) {
		statusDiv.innerHTML = '';
		const el = document.createElement('div');
		el.className = className;
		el.textContent = text;
		statusDiv.appendChild(el);
	}

	async function loadConfig() {
		try {
			const res = await fetch('/api/public-config');
			if (!res.ok) return;
			const cfg = await res.json();
			if (cfg.mailchimpConfigured) {
				mailchimpUrl = cfg.mailchimpUrl;
				mailchimpHidden = cfg.mailchimpHidden;
			}
		} catch {
			/* no API */
		}
	}

	function readForm() {
		return {
			email: document.getElementById('email')?.value?.trim() || '',
			fullName: document.getElementById('fname')?.value?.trim() || '',
			interest: document.getElementById('interest')?.value?.trim() || 'all',
		};
	}

	async function submitViaApi(payload) {
		const res = await fetch('/api/waitlist', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: payload.email,
				full_name: payload.fullName || payload.email.split('@')[0] || 'Subscriber',
				interest: payload.interest,
				lang: lang(),
				source: document.body.dataset.waitlistSource || 'website',
			}),
		});
		const data = await res.json().catch(() => ({}));
		if (!res.ok) throw new Error(data.error || res.statusText);
		return data;
	}

	async function submitViaMailchimp(payload) {
		const formData = new FormData();
		formData.append('EMAIL', payload.email);
		formData.append('FNAME', payload.fullName || 'Subscriber');
		formData.append('MMERGE2', payload.interest);
		if (mailchimpHidden) formData.append(mailchimpHidden, '');
		await fetch(mailchimpUrl, { method: 'POST', mode: 'no-cors', body: formData });
	}

	form.addEventListener('submit', async (e) => {
		e.preventDefault();
		const payload = readForm();
		if (!payload.email) return;

		const submitBtn = form.querySelector('button[type="submit"]');
		const originalText = submitBtn?.textContent || '';
		if (submitBtn) {
			submitBtn.textContent = msg('form.submitting');
			submitBtn.disabled = true;
		}

		try {
			try {
				const data = await submitViaApi(payload);
				showStatus('success-message', data.message || msg('form.successApi'));
				form.reset();
			} catch {
				if (mailchimpUrl) {
					await submitViaMailchimp(payload);
					showStatus('success-message', msg('form.success'));
					form.reset();
				} else {
					throw new Error('no channel');
				}
			}
		} catch {
			showStatus('error-message', msg('form.notConfigured'));
		} finally {
			if (submitBtn) {
				submitBtn.textContent = originalText;
				submitBtn.disabled = false;
			}
		}
	});

	loadConfig();
})();
