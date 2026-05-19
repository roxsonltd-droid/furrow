/**
 * Waitlist: POST /api/waitlist (Resend) or Mailchimp embed (env via /api/public-config).
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
			/* static hosting without API */
		}
	}

	async function submitViaApi(email) {
		const res = await fetch('/api/waitlist', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email,
				full_name: email.split('@')[0] || 'Subscriber',
				interest: 'all',
			}),
		});
		const data = await res.json().catch(() => ({}));
		if (!res.ok) throw new Error(data.error || res.statusText);
		return data;
	}

	async function submitViaMailchimp(email) {
		const formData = new FormData();
		formData.append('EMAIL', email);
		formData.append('FNAME', document.getElementById('fname')?.value?.trim() || 'Subscriber');
		formData.append('MMERGE2', document.getElementById('interest')?.value || 'all');
		if (mailchimpHidden) formData.append(mailchimpHidden, '');
		await fetch(mailchimpUrl, { method: 'POST', mode: 'no-cors', body: formData });
	}

	form.addEventListener('submit', async (e) => {
		e.preventDefault();
		const email = document.getElementById('email')?.value?.trim();
		if (!email) return;

		const submitBtn = form.querySelector('button[type="submit"]');
		const originalText = submitBtn.textContent;
		submitBtn.textContent = msg('form.submitting');
		submitBtn.disabled = true;

		try {
			let usedApi = false;
			try {
				await submitViaApi(email);
				usedApi = true;
				showStatus('success-message', msg('form.successApi'));
			} catch {
				if (mailchimpUrl) {
					await submitViaMailchimp(email);
					showStatus('success-message', msg('form.success'));
				} else {
					throw new Error('no channel');
				}
			}
			if (usedApi) form.reset();
			else if (mailchimpUrl) form.reset();
		} catch {
			showStatus('error-message', msg('form.notConfigured'));
		} finally {
			submitBtn.textContent = originalText;
			submitBtn.disabled = false;
		}
	});

	loadConfig();
})();
