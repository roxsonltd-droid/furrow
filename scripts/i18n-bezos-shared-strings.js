/** Bezos investigation series — shared nav (EN + RU) */
(function mergeBezosSharedI18n() {
	if (!window.FURROW_I18N) return;
	Object.assign(window.FURROW_I18N.en, {
		'bz.nav.home': 'Home',
		'bz.nav.archive': 'Archive',
		'bz.nav.p1': '1 · Garage & explosion',
		'bz.nav.p2': '2 · Garage myth',
		'bz.nav.p3': '3 · Amazon & CIA',
		'bz.nav.p4': '4 · Pentagon',
		'bz.nav.sponsor': 'Sponsor',
		'bz.nav.register': 'Register',
	});
	Object.assign(window.FURROW_I18N.ru, {
		'bz.nav.home': 'Главная',
		'bz.nav.archive': 'Архив',
		'bz.nav.p1': '1 · Гараж и взрив',
		'bz.nav.p2': '2 · Миф о гараже',
		'bz.nav.p3': '3 · Amazon и ЦРУ',
		'bz.nav.p4': '4 · Пентагон',
		'bz.nav.sponsor': 'Спонсорам',
		'bz.nav.register': 'Регистрация',
	});
})();
