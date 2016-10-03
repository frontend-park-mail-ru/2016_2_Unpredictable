(function () {
	'use strict';

	const fetch = window.fetch;
	const SignForm = window.SignForm;
	const AppForm = window.AppForm;
	const Block = window.Block;

	const signPage = document.querySelector('.js-sign');
	const appPage = document.querySelector('.js-app');

	class Application extends Block {
		constructor() {
			super('div', {});
			this.signFunc = this.showSignForm;
			this.appFunc = this.showAppForm;
			this.showSignForm();
		}

		showSignForm() {
			this.clearPage();

			const signForm = new SignForm();
			signForm.onSignin(this.signFunc);
			signForm.onSignup(this.appFunc);

			signForm.renderTo(signPage);
			signPage.hidden = false;

		};

		showAppForm() {
			this.clearPage();

			let userId = window.localStorage.getItem('userId');
			fetch('https://morning-hamlet-29496.herokuapp.com/api/users/' + userId, {
				method: 'GET',
				mode: 'cors'
			})
				.then(function (resp) {
					return resp.json();
				})
				.then(function (userInfo) {
					window.localStorage.setItem('login', userInfo.login);
					const appForm = new AppForm({name: userInfo.login});
					appForm.onLogout(this.signFunc);
					appForm.renderTo(appPage);
					appPage.hidden = false;
				});

		};

		clearPage() {
			signPage.hidden = true;
			appPage.hidden = true;
			signPage.innerHTML = '';
			appPage.innerHTML = '';
		};

	}

	window.Application = Application;
})();

