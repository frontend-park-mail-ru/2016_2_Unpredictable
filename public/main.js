(function () {
	'use strict';
	// TODO
	/*
	 fetch
	 localStorage
	 Promise
	 call/apply
	 bind
	 cors
	 JSDoc
	 RegExp
	 CSS

	 */

	const SignForm = window.SignForm;
	const AppForm = window.AppForm;

	const signPage = document.querySelector('.js-sign');
	const appPage = document.querySelector('.js-app');

	const showSignForm = function () {
		signPage.hidden = true;
		appPage.hidden = true;

		const signForm = new SignForm();
		signForm.onSignin(showAppForm);
		signForm.onSignup(showAppForm);

		signForm.renderTo(signPage);
		signPage.hidden = false;

	};

	const showAppForm = function () {
		signPage.hidden = true;
		appPage.hidden = true;

		const userid = window.localStorage.getItem('userid');
		fetch('/api/users/' + userid, {method: 'GET'})
			.then(function (resp) {
				return resp.json();
			})
			.then(function (userInfo) {
				window.localStorage.setItem('userLogin', userInfo.login);
				const appForm = new AppForm({name: userInfo.login});
				appForm.onLogout(showSignForm);
				appForm.renderTo(appPage);
				appPage.hidden = false;
			});


	};

	showSignForm();

})();
