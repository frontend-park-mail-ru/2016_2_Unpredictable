(function () {
	'use strict';

	const Form = window.Form;
	const Input = window.Input;
	const Button = window.Button;
	const Block = window.Block;
	const User = window.User;

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

		onLogout(callback) {
			this._logoutButton.on('click', function (e) {
				e.preventDefault();
				const model = new User();
				const res = model.logOut();
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
