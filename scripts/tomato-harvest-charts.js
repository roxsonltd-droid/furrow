(function initTomatoArticleChart() {
	const chartData = {
		labels: {
			en: ['Italy', 'China (proj.)', 'Spain', 'Portugal', 'Chile', 'Egypt', 'Türkiye', 'France', 'Bulgaria'],
			ru: ['Италия', 'Китай (прогн.)', 'Испания', 'Португалия', 'Чили', 'Египет', 'Турция', 'Франция', 'Болгария'],
		},
		values: [5.8, 5.0, 2.6, 1.3, 1.2, 0.8, 0.4, 0.15, 0.02],
		colors: ['#4a7c3a', '#2c5f2d', '#4a7c3a', '#4a7c3a', '#6b8f71', '#2c5f2d', '#2c5f2d', '#4a7c3a', '#4a7c3a'],
		axisLabel: { en: 'Million tonnes', ru: 'Млн тонн' },
	};

	let chartInstance = null;

	function getLang() {
		return window.FurrowI18n?.getLang?.() || 'en';
	}

	function renderChart() {
		const lang = getLang();
		const canvas = document.getElementById('tomatoChart');
		if (!canvas || typeof Chart === 'undefined') return;

		if (chartInstance) {
			chartInstance.destroy();
			chartInstance = null;
		}

		chartInstance = new Chart(canvas, {
			type: 'bar',
			data: {
				labels: chartData.labels[lang],
				datasets: [
					{
						data: chartData.values,
						backgroundColor: chartData.colors,
						borderRadius: 3,
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
							font: { size: 12, family: 'system-ui' },
							color: '#64748b',
						},
						grid: { color: '#e2e8f0' },
						ticks: { font: { size: 11 } },
					},
					y: {
						ticks: { font: { size: 12 } },
						grid: { display: false },
					},
				},
			},
		});
	}

	function tryRender() {
		if (typeof Chart !== 'undefined') renderChart();
		else setTimeout(tryRender, 50);
	}

	document.addEventListener('DOMContentLoaded', tryRender);
	document.addEventListener('furrow-lang-change', renderChart);
})();
