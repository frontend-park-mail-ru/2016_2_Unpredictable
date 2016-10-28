(function () {
	'use strict';

	const Form = window.Form;
	const Input = window.Input;
	const Button = window.Button;
	const Block = window.Block;
	const fetch = window.fetch;
	const User = window.User;

	class SignForm extends Form {
		constructor(options) {
			super(options);
			this._header2 = new Block('h1', {
				attrs: {
					class: 'header'
				}
			});
			this._header2._get().innerText = `TechnoOsmos`;
			this._header1 = new Block('h3', {});
			this._header1._get().innerText = `Залогинься или зарегистрируйся`;
			this._loginBlock = new Block('div', {});
			this._inputLogin = new Input({
				attrs: {
					type: 'text',
					name: 'login',
					placeholder: 'Введите свой логин'
				}
			});
			this._errorTextLogin = new Block('div', {
				attrs: {
					class: 'error'
				}
			});
			this._passwordBlock = new Block('div', {});
			this._inputPassword = new Input({
				attrs: {
					type: 'password',
					name: 'password',
					placeholder: 'Введите свой пароль'
				}
			});
			this._inButton = new Button('Залогиниться', {});
			this._upButton = new Button('Зарегистрироваться', {});
			this._errorTextPassword = new Block('div', {
				attrs: {
					class: 'error'
				}
			});
			this._errorText = new Block('div', {
				attrs: {
					class: 'error'
				}
			});

			this._back = new Button('a', {
				attrs: {
					onclick: 'history.back()'
				}
			});
			this._back._get().innerText = `Go Back`;

			this._inputLogin.renderTo(this._loginBlock._get());
			this._errorTextLogin.renderTo(this._loginBlock._get());
			this._inputPassword.renderTo(this._passwordBlock._get());
			this._errorTextPassword.renderTo(this._passwordBlock._get());
			this.append(this._header2._get());
			this.append(this._header1._get());
			this.append(this._loginBlock._get());
			this.append(this._passwordBlock._get());
			this.append(this._errorText._get());
			this.append(this._inButton._get());
			this.append(this._upButton._get());
			this.append(this._back._get());
		}

		// TODO комментарии в стиле JSDoc

		onSignup(callback) {
			this._upButton.on('click', function (button) {
				button.preventDefault();
				callback();
			});
		}

		onSignin(callback) {
			this._inButton.on('click', function (e) {
				e.preventDefault();
				const params = {
					login: this._inputLogin.getValue(),
					password: this._inputPassword.getValue()
				};
				const model = new User(params);
				const result = model.signin();
				if (model.getError()) {
					for (const key in this.errors) {
						this.errors[key]._get().innerText = '';
					}
					const errors = model.getError();
					for (const key in errors) {
						this[key]._get().innerText = errors[key];
					}
				} else if (result) {
					result.then(function () {
						window.localStorage.setItem('fromSign', 'true');
						callback();
					}).catch(function () {
						this._errorText._get().innerText = model.getError();
						return {};
					}.bind(this));
				}
			}.bind(this));
		}
	}

	window.SignForm = SignForm;

})();
