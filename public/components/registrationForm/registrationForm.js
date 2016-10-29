(function () {
	'use strict';

	const Form = window.Form;
	const Input = window.Input;
	const Button = window.Button;
	const Block = window.Block;
	const User = window.User;
	const Link = window.Link;

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
			this._header._get().innerText = 'Enter your information';
			this._inputLogin = new Input({
				attrs: {
					type: 'text',
					name: 'login',
					placeholder: 'login'
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
					placeholder: 'email'
				}
			});
			this._inputName = new Input({
				attrs: {
					type: 'text',
					name: 'name',
					placeholder: 'Your name'
				}
			});
			this._inputPassword = new Input({
				attrs: {
					type: 'password',
					name: 'password',
					placeholder: 'password'
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
					placeholder: ' confirm password'
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

			this._regButton = new Button('Sign Up', {});
			this._back = new Link('Go Back', {attrs: {href: 'back'}});
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
			this.append(this._back._get());
			this.errors = {
				logError: this._errorTextLogin,
				passError: this._errorTextPassword,
				repeatError: this._errorTextRepeat,
				commonError: this._errorText
			};
		}

		onRegistration(callback) {
			this._regButton.on('click', function (button) {
				button.preventDefault();
				const body = {
					login: this._inputLogin.getValue(),
					email: this._inputEmail.getValue(),
					name: this._inputName.getValue(),
					password: this._inputPassword.getValue(),
					repeatPassword: this._inputRepeatPassword.getValue()
				};
				const model = new User(body);
				const res = model.signup(body);
				if (model.getError()) {
					for (const key in this.errors) {
						this.errors[key]._get().innerText = '';
					}
					const errors = model.getError();
					for (const key in errors) {
						this[key]._get().innerText = errors[key];
					}
				} else if (res) {
					res.then(function () {
						callback();
					}).catch(function () {

					});
				}
			}.bind(this));
		}

		// onBack(callback) {
		// 	this._backButton.on('click', function (button) {
		// 		button.preventDefault();
		// 		callback();
		// 	});
		// }
	}

	window.RegistrationForm = RegitrationForm;


})();
