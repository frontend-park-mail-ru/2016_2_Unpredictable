(function () {
	'use strict';

	const Router = window.Router;
	const AppView = window.AppView;
	const SignView = window.SignView;
	const newSignView = window.newSignView;
	const RegView = window.RegView;
	const User = window.User;
	const ScoreView = window.ScoreView;
	const MainView = window.MainView;
	const PlayView = window.PlayView;
	const NewPlayView = window.NewPlayView;

	const options = {
		user: new User()
	};
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
		.addRoute('/sign', newSignView, options)
		.addRoute('/app', AppView, options)
		.addRoute('/score', ScoreView, options)
		// .addRoute('/authorization', newSignView, options)
		.addRoute('/singleplayer', NewPlayView, options)
		.addRoute('/multiplayer', PlayView, options)
		.addRoute('/', MainView, options)
		.start();

})();
