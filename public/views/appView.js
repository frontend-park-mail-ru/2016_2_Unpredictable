(function () {
	'use strict';

	const fetch = window.fetch;
	const AppForm = window.AppForm;
	const View = window.View;

	class AppView extends View {
		constructor() {
			super('js-app');
		}

		init() {
			const _a = function (userInfo) {
				window.localStorage.setItem('login', userInfo.login);
				this.appForm = new AppForm({name: window.localStorage.getItem('login')});
				this.appForm.onLogout(this.showSignForm.bind(this));
				this.appForm.renderTo(this.getElement());
			};
			const userid = window.localStorage.getItem('userid');
			if (!userid) {
				window.localStorage.removeItem('fromSign');
				return {};
			}
			return fetch('https://morning-hamlet-29496.herokuapp.com/api/users/' + userid, {
				method: 'GET',
				mode: 'cors'
			})
				.then(function (resp) {
					if (resp.status < 300) {
						return resp.json();
					}
				})
				.then(_a.bind(this));
		}

		/**
		 * Вызывается при каждом переходе на вьюшку(переопределена)
		 */
		resume() {
			console.log(this.user);
			if (!this.user.fromSign) {
				this.showMain();
			} else {
				console.log(this.user.getLogin());
				if (this.user.getLogin()) {
					this.appForm = new AppForm({
						name: this.user.getLogin()
					});
					this.appForm.onLogout(this.showMain.bind(this), this.user);
					//this.appForm.onScore(this.showScoreTable.bind(this));
					this.appForm.renderTo(this.getElement());
				}
				this.show();
			}
		}

		showSignForm() {
			return this.router.go('/');
		}

	}

	window.AppView = AppView;
})();
