/**
 * Placeholder nav links (href="#") — scroll or gentle "coming soon" instead of dead click.
 */
(function initFurrowNavStubs() {
	const subscribe = document.getElementById('subscribe');
	const scrollTargets = {
		markets: '#markets-sidebar',
		regions: '#regions-sidebar',
		analysis: '/archive',
		data: '/archive',
		/** Desk reports live in the archive; avoid dead `article/sample.html` (not deployed). */
		reports: '/archive',
		about: '#subscribe',
	};

	document.querySelectorAll('a[href="#"]').forEach((link) => {
		if (link.closest('.lang-switch')) return;

		link.addEventListener('click', (e) => {
			e.preventDefault();
			const key = (link.getAttribute('data-i18n') || '').split('.').pop();
			const sel = scrollTargets[key];
			if (sel && sel.startsWith('#')) {
				const el = document.querySelector(sel);
				if (el) {
					el.scrollIntoView({ behavior: 'smooth', block: 'start' });
					return;
				}
			}
			if (sel && (sel.endsWith('.html') || sel.startsWith('/'))) {
				window.location.href = sel;
				return;
			}
			if (subscribe) {
				subscribe.scrollIntoView({ behavior: 'smooth' });
			}
		});
	});

	// Update utility bar date/time to NY time
	function updateNyTime() {
		const utilEls = document.querySelectorAll('.utility-date');
		if (utilEls.length >= 2) {
			const now = new Date();
			const dateOpts = { timeZone: 'America/New_York', weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
			const timeOpts = { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' };
			
			const lang = document.documentElement.lang || 'en-US';
			utilEls[0].textContent = now.toLocaleDateString(lang, dateOpts).toUpperCase();
			utilEls[1].textContent = `New York ${now.toLocaleTimeString('en-US', timeOpts)}`;
		}
	}
	updateNyTime();
	setInterval(updateNyTime, 60000);
})();
