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
	const fetch = window.fetch;
	const SignForm = window.SignForm;
	const AppForm = window.AppForm;

	const signPage = document.querySelector('.js-sign');
	const appPage = document.querySelector('.js-app');

	const clearPage = function () {
		signPage.hidden = true;
		appPage.hidden = true;
		signPage.innerHTML = '';
		appPage.innerHTML = '';
	};

	const showSignForm = function () {
		clearPage();

		const signForm = new SignForm();
		signForm.onSignin(showAppForm);
		signForm.onSignup(showAppForm);

		signForm.renderTo(signPage);
		signPage.hidden = false;

	};

	const showAppForm = function () {
		clearPage();

		let userId = window.localStorage.getItem('userId');
		fetch('/api/users/' + userId, {method: 'GET'})
			.then(function (resp) {
				return resp.json();
			})
			.then(function (userInfo) {
				window.localStorage.setItem('login', userInfo.login);
				const appForm = new AppForm({name: userInfo.login});
				appForm.onLogout(showSignForm);
				appForm.renderTo(appPage);
				appPage.hidden = false;
			});


	};

	showSignForm();

})();
