/** Tomato harvest 2026 — full article EN/RU */
(function mergeTomatoI18n() {
	const en = {
		'tm.page.title':
			'Tomato Harvest 2026: Europe Recovers, Iran Exits | Furrow Markets',
		'tm.nav.home': 'Home',
		'tm.nav.ukraine': 'Ukraine Harvest 2026',
		'tm.nav.tomato': 'Tomato 2026',
		'tm.nav.sponsor': 'Sponsor',
		'tm.nav.register': 'Register',
		'tm.kicker': 'SOFTS & PROCESSING · ANALYSIS',
		'tm.h1': 'Tomato Harvest 2026: Europe Recovers, Iran Exits, and the Race to Fill the Gap',
		'tm.subtitle': 'A market analysis covering Europe, Asia and the Southern Hemisphere',
		'tm.meta.date': 'May 2026',
		'tm.meta.read': '12 min read',
		'tm.meta.author': 'Furrow Markets Desk',
		'tm.h2.global': 'The Global Picture',
		'tm.p.global1':
			'The 2026 processing tomato season is shaping up as a correction year. According to the World Processing Tomato Council (WPTC), global output is expected to fall below 40 million tonnes — currently estimated at 39.8 million — a modest decline from 40.3 million tonnes in 2025 and far below the record harvests of 44.4 million (2023) and 45.9 million (2024). The industry is digesting excess inventories built during two consecutive years of overproduction.',
		'tm.p.global2':
			'Three forces are reshaping the global landscape: Italy is reclaiming market share from China, Iran has banned all agri-food exports, and Egypt is emerging as a serious challenger to Mediterranean producers. Chile, operating counter-seasonally in the Southern Hemisphere, is becoming an increasingly important balancing player.',
		'tm.chart.trend.caption':
			'Figure 1. Global processing tomato production (million tonnes). Source: WPTC.',
		'tm.chart.caption':
			'Figure 2. Processing tomato production forecast 2026 by country (million tonnes). Source: WPTC crop updates, AMITOM, industry reports.',
		'tm.chart.legend.eu': 'Europe',
		'tm.chart.legend.asia': 'Asia & Middle East',
		'tm.chart.legend.sh': 'Southern Hemisphere',
		'tm.h2.europe': 'Europe: A Two-Speed Market',
		'tm.h3.italy': 'Italy — Premium Strategy Pays Off',
		'tm.p.italy':
			'Italy remains the European leader with a forecast of 5.8 million tonnes (3 million in the north, 2.8 million in centre/south). Negotiations closed on 27 March with an average reference price of €137 per tonne ex-field, including premiums for late delivery and quality bonuses. The Occhito reservoir in Puglia is full above 200 million cubic metres for the first time in three years, eliminating irrigation concerns. Italy increased its share of global production from 11.8% to 14.1% in 2025 and is positioned to consolidate that gain.',
		'tm.h3.spain': 'Spain — The Big Unknown',
		'tm.p.spain':
			'Spain is forecast at approximately 2.6 million tonnes based on similar planted acreage to last year, though yields were poor in 2025. Reservoirs in Andalusia and Extremadura are full, securing water supply for the next four years. The downside: Extremadura suffered the opposite problem in early 2026 — fields saturated and partially flooded — delaying transplanting.',
		'tm.h3.other.eu': 'Portugal, France, Bulgaria — Under Pressure',
		'tm.p.other.eu':
			'Portugal maintains its forecast of 1.3 million tonnes despite serious storm damage along the Tagus River, with field-gate prices reported at €106–107 per tonne. France will reduce output to roughly 150,000 tonnes amid acreage cuts. Bulgaria faces the harshest year: production will fall 50% to just 20,000 tonnes due to a 40% surge in energy and fertiliser costs and the planned refurbishment of the country\'s largest processor, Balkan.',
		'tm.h2.asia': 'Asia and the Middle East',
		'tm.h3.china': 'China — Geopolitics Reshapes Trade',
		'tm.p.china':
			'After record output of more than 10 million tonnes in 2024, China\'s share of global processing tomato production collapsed from 20.4% to 12.2% in 2025. The main cause: European Union buyers pulled back from Xinjiang-origin paste over labour-rights concerns. Xinjiang accounts for more than 80% of national processing volume. Chinese export prices for bulk ketchup are expected to range between $0.90 and $1.10 per kilogram, deliberately positioned slightly below Mediterranean competitors.',
		'tm.h3.egypt': 'Egypt — The New Delta',
		'tm.p.egypt':
			'Egypt holds its forecast at 800,000 tonnes. The winter crop is finished and the summer cycle starts in February with harvest from mid-May through September. Egypt has been the fastest-growing tomato paste exporter globally — between 2018 and 2022 its paste exports grew 5.6-fold, outpacing every major competitor. The industry now openly speaks of "Egypt\'s expansion and the Italian response," signalling that European processors view Egypt as a structural challenger, not a marginal player.',
		'tm.h3.iran': 'Iran — Indefinite Export Ban',
		'tm.p.iran':
			'On 3 March 2026, Iran imposed an indefinite ban on all agri-food exports following the conflict with Israel and the United States. Internet shutdowns have made real-time crop data nearly impossible to verify. The ban is significant because Iran produces approximately 1.4 million tonnes of processed tomatoes annually and exported 235,000–240,000 tonnes of paste in 2023 and 2024 — making it the world\'s eighth-largest exporter.',
		'tm.h2.who': 'Who Takes Iran\'s Market Share?',
		'tm.p.who1':
			'Iran\'s exports concentrate in a narrow geographic sphere. Five countries absorbed 96% of its paste shipments over the past three marketing years: Iraq (51–61%), Afghanistan (26%), the United Arab Emirates (5%), Russia (4%), and Kazakhstan.',
		'tm.p.who2':
			'The vacuum left by Iran\'s withdrawal is being contested by three groups of competitors, each with different strengths.',
		'tm.tbl.h1': 'Market',
		'tm.tbl.h2': 'Volume',
		'tm.tbl.h3': 'Replacement',
		'tm.tbl.iq.m': 'Iraq',
		'tm.tbl.iq.v': '~80 K t',
		'tm.tbl.iq.r': 'China, Türkiye, UAE',
		'tm.tbl.af.m': 'Afghanistan',
		'tm.tbl.af.v': '~34 K t',
		'tm.tbl.af.r': 'China, Pakistan',
		'tm.tbl.ae.m': 'UAE',
		'tm.tbl.ae.v': '~6 K t',
		'tm.tbl.ae.r': 'China, Egypt',
		'tm.tbl.ru.m': 'Russia',
		'tm.tbl.ru.v': '~4.5 K t',
		'tm.tbl.ru.r': 'China, Türkiye, Uzbekistan',
		'tm.tbl.tr.m': 'Türkiye (domestic)',
		'tm.tbl.tr.v': 'Variable',
		'tm.tbl.tr.r': 'Domestic, China',
		'tm.tbl.kz.m': 'Kazakhstan / CA',
		'tm.tbl.kz.v': '<1 K t',
		'tm.tbl.kz.r': 'Uzbekistan, China',
		'tm.h3.china.ben': 'China — The Primary Beneficiary',
		'tm.p.china.ben':
			'China is the natural winner of Iran\'s exit. With elevated inventories from 2023–2024 and a need to redirect volumes diverted from Europe due to Xinjiang concerns, Chinese producers have ready stock at competitive prices ($0.90–1.10/kg). The same Middle Eastern and Eurasian buyers that bought Iranian paste are pragmatic on origin, and China was already taking share from Iran in Iraq before the ban.',
		'tm.h3.turkey.ben': 'Türkiye — Regional Logistics Advantage',
		'tm.p.turkey.ben':
			'Türkiye is the second main candidate, particularly for the Iraqi market. Turkish producers already export approximately $700 million in tomatoes annually, including significant paste volumes, and the route through northern Iraq is well established. Türkiye is also a natural pivot for re-exports through Azerbaijan, which historically handled re-exports of Iranian produce to Russia.',
		'tm.h3.egypt.ben': 'Egypt — Eyeing Russia and the Gulf',
		'tm.p.egypt.ben':
			'Egypt is well placed to fill demand in the Gulf states (UAE, Saudi Arabia) and Russia. Egyptian paste exports grew from a minor position to global top-ten in five years, and the country specifically targets Middle Eastern and Russian markets — historically Iran\'s zones. The eight-month season (winter plus summer crops) gives Egypt year-round availability that Iran could not match.',
		'tm.h2.secondary': 'Secondary Players',
		'tm.ul.secondary':
			'<ul><li><strong>Uzbekistan</strong> — expanding into Central Asia; partial cover for Kazakhstan and Russia.</li><li><strong>Pakistan</strong> — re-exports to Afghanistan; limited logistics edge.</li><li><strong>Italy and Spain</strong> — premium alternatives for EU buyers diversifying from China; price limits volume in lower-income markets.</li><li><strong>Chile</strong> — counter-seasonal supply for Northern Hemisphere off-season; industrial buyers, not retail.</li></ul>',
		'tm.h2.chile': 'Chile — The Southern Anchor',
		'tm.p.chile1':
			'Chile dominates the Southern Hemisphere processing tomato industry, accounting for more than 40% of regional output over the past five years. The 2026 forecast was set at 1.3 million tonnes but heavy April rains will likely reduce final production to about 1.2 million tonnes. Chile\'s trade surplus in tomato concentrate reached $232 million in 2024.',
		'tm.p.chile2':
			'Chile\'s export footprint is concentrated in Latin America: between December 2024 and November 2025, Costa Rica imports rose 12%, Mexico 26%, Venezuela 16%, Guatemala 32%, and Argentina 61%. In Europe Chile is not a leading fresh tomato supplier, but its concentrate functions as a buffer during Northern Hemisphere shortages — a role that becomes more valuable as global inventories normalize.',
		'tm.h2.outlook': 'Outlook and Risks',
		'tm.ul.outlook':
			'<ul><li><strong>Price firming.</strong> With global production below the consumption baseline and inventories declining, paste prices should stabilize. Iranian withdrawal removes one of the cheapest origins from the market.</li><li><strong>Substitution risk.</strong> The EU pullback from Xinjiang-origin paste creates structural demand for Italian, Spanish, and Egyptian volumes. Egypt is the price-competitive alternative.</li><li><strong>Energy and water as wildcards.</strong> The Hormuz blockade pushed up diesel and fertiliser costs in Q1, complicating European negotiations. Drought in Spain, floods in Portugal and Extremadura, and sandstorms in Xinjiang remain unpredictable.</li></ul>',
		'tm.p.close':
			'For buyers, 2026 is a year for portfolio diversification — locking in Italian premium volumes, securing Egyptian or Chinese mid-tier supply, and using Chile as a counter-cyclical hedge. For producers, the message is simpler: Iran\'s absence is a window, but China, Türkiye and Egypt will close it quickly.',
		'tm.sources':
			'Sources: WPTC (Feb–May 2026), AMITOM, Morningstar Tomato Co., Tomato News, EastFruit, IndexBox, industry reports 2025–2026.',
		'tm.byline': '— Furrow Markets Desk',
		'tm.footer.line1': '© 2026 Furrow Markets — Agricultural market intelligence',
		'tm.footer.langs': 'English · Русский',
	};

	const ru = {
		'tm.page.title':
			'Урожай томатов 2026: Европа восстанавливается, Иран уходит | Furrow Markets',
		'tm.nav.home': 'Главная',
		'tm.nav.ukraine': 'Урожай Украины 2026',
		'tm.nav.tomato': 'Томаты 2026',
		'tm.nav.sponsor': 'Спонсорам',
		'tm.nav.register': 'Регистрация',
		'tm.kicker': 'МЯГКИЕ И ПЕРЕРАБОТКА · АНАЛИТИКА',
		'tm.h1':
			'Урожай томатов 2026: Европа восстанавливается, Иран уходит, гонка за его долю начинается',
		'tm.subtitle': 'Анализ рынка: Европа, Азия и Южное полушарие',
		'tm.meta.date': 'Май 2026',
		'tm.meta.read': '12 мин чтения',
		'tm.meta.author': 'Редакция Furrow Markets',
		'tm.h2.global': 'Глобальная картина',
		'tm.p.global1':
			'Сезон 2026 года для томатов на переработку складывается как корректирующий год. По данным WPTC, мировое производство составит менее 40 миллионов тонн — текущая оценка 39,8 миллиона тонн, что немного ниже 40,3 миллиона в 2025 году и существенно ниже рекордных 44,4 миллиона (2023) и 45,9 миллиона (2024). Отрасль переваривает избыточные запасы за два года перепроизводства.',
		'tm.p.global2':
			'Три силы меняют ландшафт: Италия отвоёвывает долю у Китая, Иран запретил экспорт всей сельхозпродукции, Египет становится серьёзным конкурентом средиземноморских производителей. Чили в противосезоне — всё более важный балансирующий игрок.',
		'tm.chart.trend.caption':
			'Рис. 1. Мировое производство томатов для переработки (млн т). Источник: WPTC.',
		'tm.chart.caption':
			'Рис. 2. Прогноз производства по странам в 2026 году (млн т). Источник: WPTC, AMITOM, отраслевые отчёты.',
		'tm.chart.legend.eu': 'Европа',
		'tm.chart.legend.asia': 'Азия и Ближний Восток',
		'tm.chart.legend.sh': 'Южное полушарие',
		'tm.h2.europe': 'Европа: рынок двух скоростей',
		'tm.h3.italy': 'Италия — премиальная стратегия оправдывает себя',
		'tm.p.italy':
			'Италия остаётся европейским лидером с прогнозом 5,8 млн т (3 млн на севере, 2,8 млн в центре и на юге). Переговоры завершились 27 марта: 137 €/т с поля, включая надбавки. Водохранилище Окито в Апулии заполнено выше 200 млн м³ впервые за три года. Доля Италии в мировом производстве выросла с 11,8% до 14,1% в 2025 году.',
		'tm.h3.spain': 'Испания — большая неизвестная',
		'tm.p.spain':
			'Прогноз — около 2,6 млн т при площадях, как в прошлом году, но урожайность в 2025 была низкой. Водохранилища Андалусии и Эстремадуры полны. В начале 2026 года поля в Эстремадуре переувлажнены и затоплены — высадка задержана.',
		'tm.h3.other.eu': 'Португалия, Франция, Болгария — под давлением',
		'tm.p.other.eu':
			'Португалия — 1,3 млн т несмотря на бури у Тахо, 106–107 €/т с поля. Франция — около 150 тыс. т. Болгария: −50% до 20 тыс. т из-за +40% к энергии и удобрениям и реконструкции завода «Балкан».',
		'tm.h2.asia': 'Азия и Ближний Восток',
		'tm.h3.china': 'Китай — геополитика меняет торговлю',
		'tm.p.china':
			'После рекорда >10 млн т в 2024 доля Китая рухнула с 20,4% до 12,2% в 2025: ЕС отказался от пасты из Синьцзяна. На Синьцзян — >80% переработки. Экспортные цены на кетчуп: 0,90–1,10 $/кг — чуть ниже средиземноморских конкурентов.',
		'tm.h3.egypt': 'Египет — новая дельта',
		'tm.p.egypt':
			'Прогноз 800 тыс. т. Зимний урожай завершён, летний цикл с мая по сентябрь. Экспорт пасты в 2018–2022 вырос в 5,6 раза — быстрее всех крупных конкурентов. «Экспансия Египта и итальянский ответ» — Египет как структурный конкурент.',
		'tm.h3.iran': 'Иран — бессрочный запрет на экспорт',
		'tm.p.iran':
			'С 3 марта 2026 — бессрочный запрет на экспорт сельхозпродукции. Иран производит ~1,4 млн т на переработку и экспортировал 235–240 тыс. т пасты в 2023–2024 (8-й экспортёр в мире).',
		'tm.h2.who': 'Кто заберёт долю Ирана?',
		'tm.p.who1':
			'96% поставок пасты за три года — в пять стран: Ирак (51–61%), Афганистан (26%), ОАЭ (5%), Россия (4%), Казахстан.',
		'tm.p.who2':
			'Вакуум оспаривают три группы конкурентов с разными сильными сторонами.',
		'tm.tbl.h1': 'Рынок',
		'tm.tbl.h2': 'Объём',
		'tm.tbl.h3': 'Замена',
		'tm.tbl.iq.m': 'Ирак',
		'tm.tbl.iq.v': '~80 тыс. т',
		'tm.tbl.iq.r': 'Китай, Турция, ОАЭ',
		'tm.tbl.af.m': 'Афганистан',
		'tm.tbl.af.v': '~34 тыс. т',
		'tm.tbl.af.r': 'Китай, Пакистан',
		'tm.tbl.ae.m': 'ОАЭ',
		'tm.tbl.ae.v': '~6 тыс. т',
		'tm.tbl.ae.r': 'Китай, Египет',
		'tm.tbl.ru.m': 'Россия',
		'tm.tbl.ru.v': '~4,5 тыс. т',
		'tm.tbl.ru.r': 'Китай, Турция, Узбекистан',
		'tm.tbl.tr.m': 'Турция (внутр.)',
		'tm.tbl.tr.v': 'Переменно',
		'tm.tbl.tr.r': 'Своё, Китай',
		'tm.tbl.kz.m': 'Казахстан / ЦА',
		'tm.tbl.kz.v': '<1 тыс. т',
		'tm.tbl.kz.r': 'Узбекистан, Китай',
		'tm.h3.china.ben': 'Китай — главный бенефициар',
		'tm.p.china.ben':
			'Китай — естественный победитель: запасы 2023–2024, цены 0,90–1,10 $/кг, перенаправление объёмов после отказа ЕС от Синьцзяна. Покупатели на Ближнем Востоке прагматичны; Китай уже брал долю в Ираке до запрета.',
		'tm.h3.turkey.ben': 'Турция — региональная логистика',
		'tm.p.turkey.ben':
			'Второй кандидат, особенно для Ирака: ~$700 млн экспорта томатной продукции в год, отлаженный маршрут через северный Ирак, реэкспорт через Азербайджан в Россию.',
		'tm.h3.egypt.ben': 'Египет — Россия и Залив',
		'tm.p.egypt.ben':
			'Египет закрывает спрос в ОАЭ, Саудовской Аравии и России. Топ-10 экспортёров за пять лет; 8-месячный сезон — круглогодичное предложение, которого у Ирана не было.',
		'tm.h2.secondary': 'Второстепенные игроки',
		'tm.ul.secondary':
			'<ul><li><strong>Узбекистан</strong> — рост в ЦА; частично Казахстан и Россия.</li><li><strong>Пакистан</strong> — реэкспорт в Афганистан.</li><li><strong>Италия и Испания</strong> — премиум для ЕС; цена ограничивает объёмы.</li><li><strong>Чили</strong> — противосезон для Северного полушария; промышленные покупатели.</li></ul>',
		'tm.h2.chile': 'Чили — южный якорь',
		'tm.p.chile1':
			'>40% переработки Южного полушария за пять лет. Прогноз 1,3 млн т, дожди в апреле — вероятно ~1,2 млн т. Профицит по концентрату — $232 млн в 2024.',
		'tm.p.chile2':
			'Экспорт в Латинскую Америку: Коста-Рика +12%, Мексика +26%, Венесуэла +16%, Гватемала +32%, Аргентина +61% (дек 2024 – ноя 2025). В Европе концентрат Чили — буфер при дефиците на Севере.',
		'tm.h2.outlook': 'Прогноз и риски',
		'tm.ul.outlook':
			'<ul><li><strong>Укрепление цен.</strong> Производство ниже потребления, запасы падают; уход Ирана убирает дешёвое происхождение.</li><li><strong>Замещение.</strong> Отказ ЕС от Синьцзяна — спрос на Италию, Испанию, Египет.</li><li><strong>Энергия и вода.</strong> Хормуз поднял дизель и удобрения в I кв.; засуха, наводнения, пыльные бури.</li></ul>',
		'tm.p.close':
			'Покупателям — диверсификация: Италия премиум, Египет/Китай середина, Чили как хедж. Производителям: окно без Ирана закроют Китай, Турция и Египет.',
		'tm.sources':
			'Источники: WPTC (фев–май 2026), AMITOM, Morningstar Tomato Co., Tomato News, EastFruit, IndexBox, отчёты 2025–2026.',
		'tm.byline': '— Редакция Furrow Markets',
		'tm.footer.line1': '© 2026 Furrow Markets — агрорыночная аналитика',
		'tm.footer.langs': 'English · Русский',
	};

	window.FURROW_I18N = window.FURROW_I18N || { en: {}, ru: {} };
	Object.assign(window.FURROW_I18N.en, en);
	Object.assign(window.FURROW_I18N.ru, ru);
})();
