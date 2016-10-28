(function () {
	'use strict';

	const Router = window.Router;
	const AppView = window.AppView;
	const SignView = window.SignView;
	const RegView = window.RegView;
	const User = window.User;
	const ScoreView = window.ScoreView;

	const options = {
		user: new User()
	};

	// TIP: роуты нужно указывать от наиболее специфичного к наименее специфичному
	// З.Ы. чтобы более ранние роуты не были префиксами более поздних ;]
	(new Router())
		.addRoute('/signup', RegView, options)
		.addRoute('/app', AppView, options)
		.addRoute('/score/', ScoreView, options)
		.addRoute('/', SignView, options)
		.start();

})();
