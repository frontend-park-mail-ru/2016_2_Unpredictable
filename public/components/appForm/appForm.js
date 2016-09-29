(function () {
	'use strict';

	const Form = window.Form;
	const Input = window.Input;
	const Button = window.Button;
	const Block = window.Block;

	class AppForm extends Form {
		constructor(options) {
			super(options);
			this._logoutButton = new Button('Log out', {});
			this._header = new Block('h1', {});
			this._header._get().innerText = `Hello, ${this._options.name || 'Anon'}`;
			this.append(this._header._get());
			this.append(this._logoutButton._get());
		}


		// TODO комментарии в стиле JSDoc
		// логаут
		_logout() {
			const userid = window.localStorage.getItem('userid');
			return fetch('/api/users' + userid, {
				method: 'DELETE'
			}).then(function () {
				window.localStorage.clear();

			}).catch(function (resp) {
				console.log(JSON.parse(resp.body).error || 'Неизвестная ошибка. Попробуйте позже');
			});
		}

		onLogout(callback) {
			this._logoutButton.on('click', function (e) {
				e.preventDefault();
				const res = this._logout();
				if (res) {
					res.then(function () {
						callback();
					});
				}
			}.bind(this));
		}

	}

	window.AppForm = AppForm;

})();
