import fs from 'fs';

let content = fs.readFileSync('scripts/i18n-home-strings.js', 'utf8');

const replacements = {
  // English lead
  "'home.lead.eyebrow': 'Softs & Processing · Analysis',": "'home.lead.eyebrow': 'Agri-Tech & Innovation',",
  "'home.lead.title': 'Tomato Harvest 2026: Europe Recovers, Iran Exits',": "'home.lead.title': 'Farming of the Future: Five Trends Reshaping How We Feed the World',",
  "'home.lead.deck':\n\t\t\t'Global output falls to 39.8 million tonnes as Iran\\'s export ban reshapes paste trade — who captures the gap.',": "'home.lead.deck':\n\t\t\t'Robots, artificial intelligence and blockchain – these aren’t words from a sci-fi novel, but real-world tools on today’s farms. Agriculture is undergoing its biggest transformation since the Green Revolution.',",
  "'home.lead.author': 'By Furrow Markets Desk',": "'home.lead.author': 'By Furrow Innovation Desk',",
  
  // English s1
  "'home.s1.cat': 'MENA · Nile Basin',": "'home.s1.cat': 'Global Markets',",
  "'home.s1.title': \"Egypt's Fields: The Desert Oasis That Feeds 108 Million People\",": "'home.s1.title': \"The Wheat Reckoning: Beijing's Billions and the Shrinking Harvest\",",
  "'home.s1.sum':\n\t\t\t'Nile dependence, wheat imports vs citrus exports, GERD water stress, and the 2026 energy shock — geography and trade in one desk read.',": "'home.s1.sum':\n\t\t\t'A landmark US–China agricultural deal and the smallest American wheat crop in 54 years are reshaping global grain markets.',",
  "'home.s1.meta': 'Furrow Desk · 12 min · 19 May 2026',": "'home.s1.meta': 'Global Markets Desk · 10 min · May 2026',",

  // English s2
  "'home.s2.cat': 'Black Sea · Politics',": "'home.s2.cat': 'US Policy',",
  "'home.s2.title': 'Russian Export Quota Mechanics: How a $14/Ton Tax Reshapes Global Wheat Trade',": "'home.s2.title': \"Eight Years in the Making: America's Farm Bill Finally Moves\",",
  "'home.s2.sum':\n\t\t\t\"The revised levy, effective May 15, recalibrates Russia's competitive position in tenders from Egypt to Algeria. Long-form analysis with five-year shipment data.\",": "'home.s2.sum':\n\t\t\t\"The $390 billion legislation reshaping food aid, crop insurance, biofuels and pesticide law now faces a treacherous Senate road.\",",
  "'home.s2.meta': 'Black Sea Desk · 9 min · 09:45 GMT',": "'home.s2.meta': 'Washington Desk · 8 min',",

  // Russian lead
  "'home.lead.eyebrow': 'Мягкие и переработка · Аналитика',": "'home.lead.eyebrow': 'Агротехнологии и инновации',",
  "'home.lead.title': 'Урожай томатов 2026: Европа восстанавливается, Иран уходит',": "'home.lead.title': 'Фермерство будущего: Пять трендов, меняющих то, как мы кормим мир',",
  "'home.lead.deck':\n\t\t\t'Мировое производство — 39,8 млн т; запрет экспорта из Ирана меняет рынок пасты.',": "'home.lead.deck':\n\t\t\t'Роботы, ИИ и блокчейн — реальные инструменты на современных фермах. Сельское хозяйство переживает величайшую трансформацию.',",
  "'home.lead.author': 'Редакция Furrow Markets',": "'home.lead.author': 'Отдел инноваций Furrow',",

  // Russian s1
  "'home.s1.cat': 'MENA · бассейн Нила',": "'home.s1.cat': 'Мировые рынки',",
  "'home.s1.title': 'Поля Египта: пустынный оазис, который кормит 108 миллионов человек',": "'home.s1.title': 'Пшеничный счёт: Миллиарды Пекина и рекордно низкий урожай',",
  "'home.s1.sum':\n\t\t\t'Нил, циклы у Асуана, дефицит зерна и экспорт цитрусов, GERD и энергетический шок 2026 — география и торговля в одном материале.',": "'home.s1.sum':\n\t\t\t'Эпохальная сделка между США и Китаем и наименьший урожай пшеницы за 54 года формируют новые контуры зернового рынка.',",
  "'home.s1.meta': 'Furrow · 12 мин · 19 мая 2026',": "'home.s1.meta': 'Отдел мировых рынков · 10 мин',",

  // Russian s2
  "'home.s2.cat': 'Чёрное море · Политика',": "'home.s2.cat': 'Политика США',",
  "'home.s2.title': 'Механика экспортной квоты РФ: как налог $14/т меняет мировую торговлю пшеницей',": "'home.s2.title': 'Восемь лет ожидания: Фарм Билл США наконец сдвинулся',",
  "'home.s2.sum':\n\t\t\t'Новый сбор с 15 мая пересматривает конкурентоспособность России в тендерах от Египта до Алжира. Разбор с данными за пять лет.',": "'home.s2.sum':\n\t\t\t'Пакет стоимостью $390 миллиардов, затрагивающий продовольственную помощь и страхование урожая, теперь должен пройти Сенат.',",
  "'home.s2.meta': 'Чёрное море · 9 мин · 09:45 GMT',": "'home.s2.meta': 'Вашингтон · 8 мин',",
};

for (const [key, value] of Object.entries(replacements)) {
  content = content.replace(key, value);
}

fs.writeFileSync('scripts/i18n-home-strings.js', content);
