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

			this._inputRepeatPassword = new Input({
				attrs: {
					type: 'password',
					name: 'reppassword',
					placeholder: 'Подтвердите пароль'
				}
			});
			this._errorText = new Block('div', {
				attrs: {
					class: 'error'
				}
			});
			this._regButton = new Button('Зарегистрироваться', {});
			this._backButton = new Button('Назад', {});
			this.append(this._header._get());
			this.append(this._inputLogin._get());
			this.append(this._inputEmail._get());
			this.append(this._inputName._get());
			this.append(this._inputPassword._get());
			this.append(this._inputRepeatPassword._get());
			this.append(this._errorText._get());
			this.append(this._regButton._get());
			this.append(this._backButton._get());

		}

		onRegistration(callback) {
			this._regButton.on('click', function (button) {
				button.preventDefault();
				const body = {
					login: this._inputLogin.getValue(),
					email: this._inputName.getValue(),
					// name : this._inputName.getValue(),
					password: this._inputName.getValue()
				};
				const model = new User(body);
				const res = model.signup(body);
				if (res) {
					res.then(function () {
						callback();
					});
				}
			}.bind(this));
		}

		onBack(callback) {
			this._backButton.on('click', function (button) {
				button.preventDefault();
				callback();
			});
		}

	}

	window.RegistrationForm = RegitrationForm;


})();
