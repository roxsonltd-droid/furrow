(function initSponsorPage() {
	const form = document.getElementById('sponsor-form');
	const statusDiv = document.getElementById('form-status');
	const interestSelect = document.getElementById('interest-package');
	const contactSection = document.getElementById('contact');

	window.selectPackage = function selectPackage(packageName) {
		if (interestSelect) {
			const opt = Array.from(interestSelect.options).find(
				(o) => o.value === packageName || o.textContent.includes(packageName.split(' ')[0])
			);
			if (opt) interestSelect.value = opt.value;
			else {
				const custom = document.createElement('option');
				custom.value = packageName;
				custom.textContent = packageName;
				custom.selected = true;
				interestSelect.appendChild(custom);
			}
		}
		if (contactSection) {
			contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	};

	window.downloadMediaKit = function downloadMediaKit() {
		window.location.href =
			'mailto:sponsors@furrowmarkets.com?subject=Media%20Kit%20Request&body=Please%20send%20the%20Furrow%20Markets%20media%20kit.';
	};

	if (!form) return;

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		const fullname = document.getElementById('fullname')?.value?.trim() || '';
		const company = document.getElementById('company')?.value?.trim() || '';
		const email = document.getElementById('email')?.value?.trim() || '';
		const phone = document.getElementById('phone')?.value?.trim() || '';
		const interestPackage = interestSelect?.value || '';
		const budget = document.getElementById('budget')?.value || '';
		const message = document.getElementById('message')?.value?.trim() || '';

		const submitBtn = form.querySelector('.submit-btn');
		const originalText = submitBtn?.textContent || 'Send Inquiry →';
		if (submitBtn) {
			submitBtn.textContent = 'Sending...';
			submitBtn.disabled = true;
		}

		const emailBody = `Sponsorship Inquiry from ${fullname}

Name: ${fullname}
Company: ${company}
Email: ${email}
Phone: ${phone}
Package: ${interestPackage}
Budget: ${budget}

Message:
${message}

---
Submitted from Furrow Markets sponsor page`;

		const mailtoLink = `mailto:sponsors@furrowmarkets.com?subject=${encodeURIComponent('Sponsorship Inquiry from ' + company)}&body=${encodeURIComponent(emailBody)}`;
		window.location.href = mailtoLink;

		if (statusDiv) {
			statusDiv.innerHTML =
				'<div class="form-success">Thanks! We\'ll get back to you within 24 hours. Your email client should open — please send the generated message.</div>';
		}
		form.reset();

		if (submitBtn) {
			submitBtn.textContent = originalText;
			submitBtn.disabled = false;
		}
	});

	// Pre-select package from URL ?package=banner|issue|leads
	const params = new URLSearchParams(window.location.search);
	const pkg = params.get('package');
	if (pkg && interestSelect) {
		const map = { banner: 'Banner Ads', issue: 'Sponsored Issue', leads: 'Lead Generation' };
		const val = map[pkg.toLowerCase()];
		if (val) interestSelect.value = val;
	}
})();
