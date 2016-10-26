(function () {
	'use strict';

	const Router = window.Router;
	const AppView = window.AppView;
	const SignView = window.SignView;
	const RegView = window.RegView;
	const ScoreView = window.ScoreView;
	const MainView = window.MainView;


	// TIP: роуты нужно указывать от наиболее специфичного к наименее специфичному
	// З.Ы. чтобы более ранние роуты не были префиксами более поздних ;]
	(new Router())
		.addRoute('/signup', RegView)
		.addRoute('/app/score/', ScoreView)
		.addRoute('/app', AppView)
		.addRoute('/', MainView)
		.start();

})();
