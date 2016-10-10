(function () {
	'use strict';

	const fetch = window.fetch;
	const AppForm = window.AppForm;
	const View = window.View;

	class AppView extends View {
		constructor() {
			super('js-app');
			this.showAppForm();
		}

		showAppForm() {
			this.getLogin();
			const appForm = new AppForm({name: window.localStorage.getItem('login')});
			appForm.onLogout(this.showSignForm.bind(this));
			appForm.renderTo(this.getElement());
		};

		getLogin() {
			const _a = function (userInfo) {
				window.localStorage.setItem('login', userInfo.login);
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

		showSignForm(){
			this.hide();
			return this.router.go('/');
		};

	}

	window.AppView = AppView;
})();
