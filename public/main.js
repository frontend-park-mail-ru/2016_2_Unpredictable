(function () {
	'use strict';

	const Router = window.Router;
	const AppView = window.AppView;
	const SignView = window.SignView;
	const RegView = window.RegView;
	const ScoreView = window.ScoreView;
	const MainView = window.MainView;
	const PlayView = window.PlayView;


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
