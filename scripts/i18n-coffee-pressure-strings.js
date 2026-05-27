/** Coffee / softs desk — Under Pressure article */
(function mergeCoffeePressureI18n() {
	const en = {
		'cp.page.title':
			'Under Pressure: Climate, Markets, and Politics Shake the Global Coffee Industry | Furrow Markets',
		'cp.nav.home': 'Home',
		'cp.nav.archive': 'Archive',
		'cp.nav.here': 'Global coffee',
		'cp.nav.tomato': 'Tomato 2026',
		'cp.nav.sponsor': 'Sponsor',
		'cp.nav.register': 'Register',
		'cp.kicker': 'SOFTS · COFFEE · GLOBAL',
		'cp.h1': 'Under Pressure: Climate, Markets, and Politics Shake the Global Industry',
		'cp.meta.date': 'May 2026',
		'cp.meta.read': '12 min read',
		'cp.meta.author': 'Furrow Softs Desk',
		'cp.lead':
			'The morning cup is becoming more expensive — and inflation is only part of the story. Behind the rising prices stand climate crises, market speculation, geopolitical tensions, and increasingly unpredictable harvests. The global industry is going through one of its most turbulent periods in decades.',
		'cp.h2.markets': 'Markets Are Setting the Price',
		'cp.p.markets1':
			'The main benchmarks for international trade are the exchanges in New York and London. Arabica is primarily traded in New York, while Robusta is traded in London. These markets determine the prices that eventually reach supermarkets, cafés, and consumers worldwide.',
		'cp.p.markets2':
			'In 2025, Arabica prices crossed the psychological threshold of $4 per pound — a level not seen in years. By comparison, during 2023 prices were often trading around $1.80–$2 per pound.',
		'cp.p.markets3':
			'Robusta also reached record highs after severe droughts hit Vietnam, one of the world’s largest producers. The result was immediate: retail prices in Europe and the United States rose by 15% to 30%, while some manufacturers reduced package sizes instead of raising prices directly.',
		'cp.h2.climate': 'Climate Remains the Biggest Threat',
		'cp.p.climate1':
			'Brazil — the world’s largest producer — has been struggling with droughts, extreme heat, and unstable rainfall. Vietnam is also facing major water shortages.',
		'cp.p.climate2':
			'Today, even a forecast for unusually hot weather in South America can move prices within hours. Markets react nervously to every climate-related update because global inventories remain critically low.',
		'cp.p.climate3':
			'Analysts warn that the problem is no longer temporary. Climate change is beginning to permanently reshape traditional growing regions.',
		'cp.h2.scenarios': 'A Strong Year… or the Beginning of a Collapse?',
		'cp.p.scenarios1': 'The market is currently divided between two scenarios.',
		'cp.p.scenarios2':
			'The optimistic outlook points to a potentially strong Brazilian harvest. If production exceeds expectations, global inventories could slowly recover and ease some of the pressure.',
		'cp.p.scenarios3':
			'But there is also a growing fear of a sharp market correction. History shows that periods of extremely high prices are often followed by aggressive expansion from producers. A few years later, oversupply floods the market — and prices collapse.',
		'cp.h2.crash': 'What Could Trigger a Market Crash?',
		'cp.h3.oversupply': 'Oversupply',
		'cp.p.oversupply1':
			'If Brazil, Vietnam, and Colombia all produce exceptionally strong harvests at the same time, the market could quickly shift from shortage to surplus.',
		'cp.p.oversupply2':
			'Brazil alone has enough influence to change the direction of global prices with a single harvest season.',
		'cp.h3.demand': 'Falling Consumer Demand',
		'cp.p.demand1':
			'Higher retail prices are already changing consumer behavior. Some buyers are switching to cheaper blends, while others are cutting consumption entirely.',
		'cp.p.demand2': 'In the event of a global economic slowdown:',
		'cp.ul.demand':
			'<ul><li>café sales could decline;</li><li>demand for premium products may weaken;</li><li>major chains could reduce purchasing volumes.</li></ul>',
		'cp.h3.speculation': 'Speculation on Commodity Exchanges',
		'cp.p.spec1':
			'The industry is heavily influenced by hedge funds and futures trading. When large investors begin selling contracts aggressively:',
		'cp.ul.spec':
			'<ul><li>prices can fall within days;</li><li>panic spreads across physical markets;</li><li>producers are left holding unsold inventory.</li></ul>',
		'cp.p.spec2':
			'Analysts warn that the sector is becoming increasingly vulnerable to speculative volatility, similar to what has already happened with cocoa and sugar.',
		'cp.h2.politics': 'Politics and Trade Wars',
		'cp.p.politics':
			'Tariffs, sanctions, and environmental regulations now play a direct role in pricing. The European Union is tightening rules on imports linked to deforestation, while growing tensions between major economies continue to increase uncertainty across global trade routes.',
		'cp.h2.currency': 'Currency Pressure',
		'cp.p.currency1':
			'Most international transactions are conducted in U.S. dollars. When the dollar strengthens:',
		'cp.ul.currency':
			'<ul><li>the commodity becomes more expensive for importing countries;</li><li>consumption tends to slow;</li><li>downward pressure on prices increases.</li></ul>',
		'cp.h2.beverage': 'More Than Just a Beverage',
		'cp.p.close1':
			'Today, this is no longer simply an agricultural product. It has become one of the most sensitive commodities in the global economy — deeply connected to climate, politics, logistics, and financial markets.',
		'cp.p.close2':
			'A drought in Brazil, a new tariff policy, or panic on the New York exchange can influence prices across the world within hours.',
		'cp.p.close3':
			'The next two years could prove decisive. If production stabilizes, markets may gradually calm down. But if climate pressure continues to intensify, volatility may become the industry’s new normal.',
		'cp.byline': '— Furrow Softs Desk',
		'cp.footer.line1': '© 2026 Furrow Markets — Agricultural market intelligence',
		'cp.footer.langs': 'English · Русский',
	};

	const ru = {
		'cp.page.title':
			'Под давлением: климат, рынки и политика потрясают мировую кофейную отрасль | Furrow Markets',
		'cp.nav.home': 'Главная',
		'cp.nav.archive': 'Архив',
		'cp.nav.here': 'Мировой кофе',
		'cp.nav.tomato': 'Томаты 2026',
		'cp.nav.sponsor': 'Спонсорам',
		'cp.nav.register': 'Регистрация',
		'cp.kicker': 'МЯГКИЕ · КОФЕ · МИР',
		'cp.h1': 'Под давлением: климат, рынки и политика потрясают мировую кофейную отрасль',
		'cp.meta.date': 'Май 2026',
		'cp.meta.read': '12 мин чтения',
		'cp.meta.author': 'Отдел мягких культур Furrow',
		'cp.lead':
			'Утренняя чашка дорожает — и дело не только в инфляции. За ростом цен стоят климатические кризисы, спекуляции на рынках, геополитика и всё менее предсказуемые урожаи. Мировая отрасль переживает один из самых бурных периодов за десятилетия.',
		'cp.h2.markets': 'Цену задают биржи',
		'cp.p.markets1':
			'Главные ориентиры международной торговли — площадки в Нью-Йорке и Лондоне: арабика в основном в Нью-Йорке, робуста — в Лондоне. Именно там формируются котировки, которые доходят до супермаркетов, кофеен и потребителей по всему миру.',
		'cp.p.markets2':
			'В 2025 году арабика пробила психологический уровень $4 за фунт — такого не было годами. Для сравнения: в 2023 году цены часто держались около $1,80–$2 за фунт.',
		'cp.p.markets3':
			'Робуста тоже обновила максимумы после сильной засухи во Вьетнаме — одном из крупнейших производителей. Розница в Европе и США почти сразу подорожала на 15–30%, а часть производителей сократила фасовку вместо прямого повышения цен.',
		'cp.h2.climate': 'Главная угроза — климат',
		'cp.p.climate1':
			'Бразилия — крупнейший в мире производитель — борется с засухами, экстремальной жарой и нестабильными осадками. Во Вьетнаме ощущается острый дефицит воды.',
		'cp.p.climate2':
			'Сегодня даже прогноз необычно жаркой погоды в Южной Америке может сдвинуть цены за часы. Рынок нервно реагирует на любые климатические новости: мировые запасы остаются на критически низком уровне.',
		'cp.p.climate3':
			'Аналитики предупреждают: это уже не временный сбой. Изменение климата постепенно перекраивает привычные зоны выращивания.',
		'cp.h2.scenarios': 'Сильный год… или начало обвала?',
		'cp.p.scenarios1': 'Рынок сейчас расколот на два сценария.',
		'cp.p.scenarios2':
			'Оптимисты ждут сильного бразильского урожая: если производство превзойдёт ожидания, запасы могут медленно восстановиться и частично снять давление.',
		'cp.p.scenarios3':
			'Но растёт и страх резкой коррекции. История знает периоды экстремально высоких цен, за которыми следует агрессивное расширение посевов — через несколько лет избыток заливает рынок, и цены рушатся.',
		'cp.h2.crash': 'Что может спровоцировать обвал?',
		'cp.h3.oversupply': 'Перепроизводство',
		'cp.p.oversupply1':
			'Если Бразилия, Вьетнам и Колумбия одновременно соберут исключительно сильные урожаи, рынок может быстро перейти от дефицита к избытку.',
		'cp.p.oversupply2':
			'Одной бразильской кампании часто достаточно, чтобы развернуть направление мировых цен.',
		'cp.h3.demand': 'Падение спроса со стороны потребителей',
		'cp.p.demand1':
			'Рост розничных цен уже меняет поведение: часть покупателей уходит в более дешёвые купажи, другие сокращают потребление.',
		'cp.p.demand2': 'При глобальном экономическом замедлении возможны следующие эффекты:',
		'cp.ul.demand':
			'<ul><li>продажи в кофейнях могут снизиться;</li><li>спрос на премиальные позиции ослабнет;</li><li>крупные сети сократят закупочные объёмы.</li></ul>',
		'cp.h3.speculation': 'Спекуляция на товарных биржах',
		'cp.p.spec1':
			'Отрасль сильно зависит от хедж-фондов и фьючерсной торговли. Когда крупные игроки массово продают контракты, последствия наступают быстро:',
		'cp.ul.spec':
			'<ul><li>цены могут обвалиться за дни;</li><li>паника перекидывается на физический рынок;</li><li>производители остаются с нереализованными запасами.</li></ul>',
		'cp.p.spec2':
			'Аналитики отмечают растущую уязвимость сектора к спекулятивной волатильности — похоже на то, что уже происходило с какао и сахаром.',
		'cp.h2.politics': 'Политика и торговые войны',
		'cp.p.politics':
			'Тарифы, санкции и экологическое регулирование напрямую влияют на ценообразование. ЕС ужесточает правила импорта, связанного с обезлесением, а напряжённость между крупными экономиками наращивает неопределённость на торговых маршрутах.',
		'cp.h2.currency': 'Валютное давление',
		'cp.p.currency1':
			'Большинство международных расчётов идёт в долларах США. При укреплении доллара:',
		'cp.ul.currency':
			'<ul><li>сырьё дорожает для стран-импортёров;</li><li>потребление замедляется;</li><li>усиливается давление вниз на цены.</li></ul>',
		'cp.h2.beverage': 'Больше, чем просто напиток',
		'cp.p.close1':
			'Сегодня это уже не просто сельхозпродукт: кофе стал одним из самых чувствительных сырьевых активов в мировой экономике — связанным с климатом, политикой, логистикой и финансовыми рынками.',
		'cp.p.close2':
			'Засуха в Бразилии, новый тариф или паника в Нью-Йорке могут за часы изменить цены по всему миру.',
		'cp.p.close3':
			'Следующие два года могут оказаться решающими: при стабилизации производства рынки постепенно успокоятся; если климатическое давление усилится, волатильность станет новой нормой отрасли.',
		'cp.byline': '— Отдел мягких культур Furrow',
		'cp.footer.line1': '© 2026 Furrow Markets — агрорыночная аналитика',
		'cp.footer.langs': 'English · Русский',
	};

	window.FURROW_I18N = window.FURROW_I18N || { en: {}, ru: {} };
	Object.assign(window.FURROW_I18N.en, en);
	Object.assign(window.FURROW_I18N.ru, ru);
})();
