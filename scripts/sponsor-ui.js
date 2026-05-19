/** Become a sponsor → scroll to #sponsors */
(function initFurrowSponsorUi() {
	const btn = document.getElementById('sponsorBtn');
	const section = document.getElementById('sponsors');
	if (!btn) return;

	btn.addEventListener('click', (e) => {
		e.preventDefault();
		if (section) {
			section.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	});
})();
