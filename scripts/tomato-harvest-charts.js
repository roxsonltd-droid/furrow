(function initTomatoHarvestCharts() {
	const chartData = {
		labels: {
			en: ['Italy', 'China (proj.)', 'Spain', 'Portugal', 'Chile', 'Egypt', 'Türkiye', 'France', 'Bulgaria'],
			ru: ['Италия', 'Китай (прогн.)', 'Испания', 'Португалия', 'Чили', 'Египет', 'Турция', 'Франция', 'Болгария'],
		},
		values: [5.8, 5.0, 2.6, 1.3, 1.2, 0.8, 0.4, 0.15, 0.02],
		colors: ['#D85A30', '#7F77DD', '#D85A30', '#D85A30', '#1D9E75', '#7F77DD', '#7F77DD', '#D85A30', '#D85A30'],
		axisLabel: { en: 'Million tonnes', ru: 'Миллионов тонн' },
	};

	const chartsBuilt = { en: false, ru: false };

	function makeChart(canvasId, lang) {
		const ctx = document.getElementById(canvasId);
		if (!ctx || typeof Chart === 'undefined') return;
		new Chart(ctx, {
			type: 'bar',
			data: {
				labels: chartData.labels[lang],
				datasets: [
					{
						data: chartData.values,
						backgroundColor: chartData.colors,
						borderRadius: 4,
						borderWidth: 0,
					},
				],
			},
			options: {
				indexAxis: 'y',
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: { display: false },
					tooltip: {
						callbacks: {
							label: (c) =>
								c.parsed.x.toFixed(2) + ' ' + chartData.axisLabel[lang].toLowerCase(),
						},
					},
				},
				scales: {
					x: {
						beginAtZero: true,
						title: {
							display: true,
							text: chartData.axisLabel[lang],
							font: { size: 13 },
						},
						grid: { color: '#f0ede5' },
					},
					y: {
						ticks: { font: { size: 13 } },
						grid: { display: false },
					},
				},
			},
		});
	}

	window.setTomatoLang = function setTomatoLang(lang) {
		const en = lang === 'en';
		document.getElementById('content-en')?.classList.toggle('hidden', !en);
		document.getElementById('content-ru')?.classList.toggle('hidden', en);
		document.querySelectorAll('.tomato-page .lang-btn').forEach((btn) => {
			const isEn = btn.dataset.lang === 'en';
			btn.classList.toggle('active', isEn === en);
		});
		if (!chartsBuilt[lang]) {
			makeChart(lang === 'en' ? 'chartEn' : 'chartRu', lang);
			chartsBuilt[lang] = true;
		}
		document.documentElement.lang = lang;
		try {
			localStorage.setItem('furrow_lang', lang);
		} catch (_) {}
	};

	document.addEventListener('DOMContentLoaded', () => {
		let lang = 'en';
		try {
			const saved = localStorage.getItem('furrow_lang');
			if (saved === 'ru' || saved === 'en') lang = saved;
		} catch (_) {}
		setTomatoLang(lang);
	});
})();
