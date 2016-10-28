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

		resume() {
			if (window.localStorage.getItem('fromSign') === null) {
				this.showSignForm();
			} else {
				this.show();
			}
		}

		show() {
			setTimeout(() => {
				this._el.hidden = false;
				this._el.classList.toggle('js-app--hidden', false);

			}, 301);
		}

		pause() {
			this._el.classList.toggle('js-app--hidden', true);
			this.hide();
		}

		hide() {
			setTimeout(() => {
				this._el.hidden = true;
			}, 300);
		}

		showSignForm() {
			return this.router.go('/');
		}

	}

	window.AppView = AppView;
})();
