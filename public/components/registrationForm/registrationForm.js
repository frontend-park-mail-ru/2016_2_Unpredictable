(function () {
	'use strict';

	const Form = window.Form;
	const Input = window.Input;
	const Button = window.Button;
	const Block = window.Block;
	const User = window.User;

	class RegitrationForm extends Form {
		constructor(options) {
			super(options);
			this._header1 = new Block('h1', {
				attrs: {
					class: 'header'
				}
			});
			this._header1._get().innerText = `TechnoOsmos`;

			this._header = new Block('h3', {
				attrs: {
					class: 'header'
				}
			});
			this._header._get().innerText = 'Введите свои данные';
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

			this._inputEmail = new Input({
				attrs: {
					type: 'text',
					name: 'email',
					placeholder: 'Введите свой email'
				}
			});
			this._inputName = new Input({
				attrs: {
					type: 'text',
					name: 'name',
					placeholder: 'Введите свое имя'
				}
			});
			this._inputPassword = new Input({
				attrs: {
					type: 'password',
					name: 'password',
					placeholder: 'Введите пароль'
				}
			});
			this._errorTextPassword = new Block('div', {
				attrs: {
					class: 'error'
				}
			});

			this._inputRepeatPassword = new Input({
				attrs: {
					type: 'password',
					name: 'reppassword',
					placeholder: 'Подтвердите пароль'
				}
			});
			this._errorTextRepeat = new Block('div', {
				attrs: {
					class: 'error'
				}
			});
			this._errorText = new Block('div', {
				attrs: {
					class: 'error'
				}
			});

			this._regButton = new Button('Registrate!', {});
			this._backButton = new Button('Go Back', {});
			// this._back = new Button('a',{attrs: {
			// 	onclick:'history.back()'
			// }});
			// this._back._get().innerText = `Go Back`;

			this.append(this._header1._get());
			this.append(this._header._get());
			this.append(this._inputLogin._get());
			this.append(this._errorTextLogin._get());
			this.append(this._inputEmail._get());
			this.append(this._inputName._get());
			this.append(this._inputPassword._get());
			this.append(this._errorTextPassword._get());
			this.append(this._inputRepeatPassword._get());
			this.append(this._errorTextRepeat._get());
			this.append(this._errorText._get());
			this.append(this._regButton._get());
			this.append(this._backButton._get());
			this.errors = {
				logError: this._errorTextLogin,
				passError: this._errorTextPassword,
				repeatError: this._errorTextRepeat,
				commonError: this._errorText
			}
		}

		onRegistration(callback, options = {}) {
			this._regButton.on('click', function (button) {
				button.preventDefault();
				const body = {
					login: this._inputLogin.getValue(),
					email: this._inputEmail.getValue(),
					//name : this._inputName.getValue(),
					password: this._inputPassword.getValue(),
					//repeatPassword : this._inputRepeatPassword.getValue()
				};
				options.setUserInfo(body);
				const res = options.signup();
				for (let key in this.errors) {
					this.errors[key]._get().innerText = '';
				}
				if (options.getError()) {
					let errors = options.getError();
					for (let key in errors) {
						this[key]._get().innerText = errors[key];
					}
				} else if (res) {
					res.then(function () {
						callback();
					}).catch(console.error);
				}
			}.bind(this));
			options.clearErrors();
		}

		onBack(callback, options = {}) {
			this._backButton.on('click', function (button) {
				button.preventDefault();
				options.clearErrors();
				callback();
			});
		}

		clearInputErrors() {
			for (let key in this.errors) {
				this.errors[key]._get().innerText = '';
			}
		}
	}

	window.RegistrationForm = RegitrationForm;

})();
