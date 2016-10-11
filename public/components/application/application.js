(function () {
	'use strict';

	const fetch = window.fetch;
	const SignForm = window.SignForm;
	const AppForm = window.AppForm;
	const Block = window.Block;

	const signPage = document.querySelector('.js-sign');
	const appPage = document.querySelector('.js-app');

	function clearPage() {
		signPage.hidden = true;
		appPage.hidden = true;
		signPage.innerHTML = '';
		appPage.innerHTML = '';
	}

	class Application extends Block {
		constructor() {
			super('div', {});

			this.showSignForm = this.showSignForm.bind(this);
			this.showAppForm = this.showAppForm.bind(this);
			this.showSignForm();
		}

		showSignForm() {
			clearPage();

			const signForm = new SignForm();
			signForm.onSignin(this.showAppForm);
			signForm.onSignup(this.showAppForm);

			signForm.renderTo(signPage);
			signPage.hidden = false;

		};

		showAppForm() {
			clearPage();
			const _a = function (userInfo) {
				window.localStorage.setItem('login', userInfo.login);
				const appForm = new AppForm({name: window.localStorage.getItem('login')});
				console.log(appForm);
				appForm.onLogout(this.showSignForm);
				signPage.hidden = true;
				appPage.hidden = false;
				appForm.renderTo(appPage);
			};
			let userId = window.localStorage.getItem('userid');
			fetch('https://morning-hamlet-29496.herokuapp.com/api/users/' + userId, {
				method: 'GET',
				mode: 'cors'
			})
				.then(function (resp) {
					return resp.json();
				})
				.then(_a.bind(this));

		};


	}

	window.Application = Application;
})();

