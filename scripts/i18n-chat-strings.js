/** Chat UI strings — merged into FURROW_I18N */
(function mergeChatI18n() {
	if (!window.FURROW_I18N) return;
	Object.assign(window.FURROW_I18N.en, {
		'chat.fab': 'AI Analyst',
		'chat.title': 'Furrow Analyst',
		'chat.hint': 'Market intelligence · launch 2026',
		'chat.placeholder': 'Ask about grains, Black Sea, pricing…',
		'chat.welcome':
			'Hello — I\'m Furrow Analyst. I can explain our plans, coverage, and pricing, or add you to the early-access waitlist.',
		'chat.thinking': 'Analyzing…',
		'chat.offlinePh': 'AI offline — configure API key on server',
		'chat.offlineReply': 'The analyst is offline. Set MISTRAL_API_KEY and run npm run dev.',
		'chat.noReply': 'No response from server.',
		'chat.network': 'Network error — is the API running?',
		'chat.busy': 'Something went wrong. Try again.',
		'chat.quickPricing': 'Pricing plans',
		'chat.quickWaitlist': 'Join waitlist',
		'chat.quickBlackSea': 'Black Sea wheat',
		'chat.quickMarkets': 'CBOT prices',
	});
	Object.assign(window.FURROW_I18N.ru, {
		'chat.fab': 'AI Аналитик',
		'chat.title': 'Furrow Analyst',
		'chat.hint': 'Аналитика рынков · запуск 2026',
		'chat.placeholder': 'Спросите про зерно, Чёрное море, тарифы…',
		'chat.welcome':
			'Здравствуйте — я Furrow Analyst. Расскажу о платформе, тарифах и могу добавить вас в лист ожидания.',
		'chat.thinking': 'Анализ…',
		'chat.offlinePh': 'AI offline — нужен API ключ на сервере',
		'chat.offlineReply': 'Аналитик offline. Задайте MISTRAL_API_KEY и npm run dev.',
		'chat.noReply': 'Нет ответа от сервера.',
		'chat.network': 'Ошибка сети — API запущен?',
		'chat.busy': 'Ошибка. Попробуйте снова.',
		'chat.quickPricing': 'Тарифы',
		'chat.quickWaitlist': 'Лист ожидания',
		'chat.quickBlackSea': 'Пшеница ЧМ',
		'chat.quickMarkets': 'CBOT',
	});
})();
