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

			this._back = new Button('a',{attrs: {
				onclick:'history.back()'
			}});
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
			this.errors = {
				errorTextLogin: this._errorTextLogin,
				errorTextPassword: this._errorTextPassword
			};
		}

		// TODO комментарии в стиле JSDoc

		onSignup(callback, options = {}) {
			this._upButton.on('click', function (button) {
				button.preventDefault();
				options.clearErrors();
				callback();
			});
		}

		onSignin(callback, options = {}) {
			this._inButton.on('click', function (e) {
				e.preventDefault();
				const body = {
					login: this._inputLogin.getValue(),
					password: this._inputPassword.getValue()
				};
				options.setUserInfo(body);
				const result = options.signin();
				if (options.getError()) {
					const errors = options.getError();
					for (let key in errors) {
						this[key]._get().innerText = errors[key];
					}
				} else if (result) {
					result.then(function () {
						callback();
					}).catch(function () {
						this._errorText._get().innerText = options.getError();
						return {};
					}.bind(this));
				}

			}.bind(this));
			options.clearErrors();
		}

		clearInputErrors() {
			for (let key in this.errors) {
				this.errors[key]._get().innerText = '';
			}
		}
	}

	window.SignForm = SignForm;

})();
