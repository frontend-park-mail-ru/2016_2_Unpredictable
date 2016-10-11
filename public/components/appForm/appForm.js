(function () {
	'use strict';

	const Form = window.Form;
	const Input = window.Input;
	const Button = window.Button;
	const Block = window.Block;
	const fetch = window.fetch;

	class AppForm extends Form {
		constructor(options) {
			super(options);
			this._logoutButton = new Button('Log out', {});
			this._header = new Block('h1', {});
			console.log(this);
			this._header._get().innerText = `Hello, ${this._options.name || 'Anon'}`;
			this.append(this._header._get());
			this.append(this._logoutButton._get());
		}


		// TODO комментарии в стиле JSDoc
		// логаут
		_logout() {
			const sessionid = window.localStorage.getItem('sessionid');
			return fetch('https://morning-hamlet-29496.herokuapp.com/api/sessions/' + sessionid, {
				method: 'DELETE',
				mode: 'cors'
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
					}).catch();
				}
			}.bind(this));
		}

	}

	window.AppForm = AppForm;

})();
