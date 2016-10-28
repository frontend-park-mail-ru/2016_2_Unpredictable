(function () {
	'use strict';

	console.log('Перезагрузили страницу');

	const Router = window.Router;
	const AppView = window.AppView;
	const SignView = window.SignView;
	const RegView = window.RegView;
	const ScoreView = window.ScoreView;
	const MainView = window.MainView;
	const PlayView = window.PlayView;

	const eventListener = function (event) {
		const el = event.target;
		if (el.tagName === 'A' && (el.getAttribute('data-nav') || el.getAttribute('href'))) {
			const url = el.getAttribute('data-nav') || el.getAttribute('href');
			if (el.target !== '_blank' && el.target !== '_self') {
				if (url === 'back') {
					new Router().back();
				}
				event.preventDefault();
				new Router().go(url);
			}
		}
	};

	window.addEventListener('click', eventListener);
	window.addEventListener('tap', eventListener);


	// TIP: роуты нужно указывать от наиболее специфичного к наименее специфичному
	// З.Ы. чтобы более ранние роуты не были префиксами более поздних ;]
	(new Router())
		.addRoute('/signup', RegView)
		.addRoute('/app', AppView)
		.addRoute('/score/', ScoreView)
		.addRoute('/authorization', SignView)
		.addRoute('/singleplayer', PlayView)
		.addRoute('/multiplayer', PlayView)
		.addRoute('/', MainView)
		.start();

})();
