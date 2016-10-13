(function () {
	'use strict';

	const Form = window.Form;
	const Input = window.Input;
	const Button = window.Button;
	const Block = window.Block;
	const fetch = window.fetch;
	const sendToServer = window.sendToServer;

	const validateLogin = function (login) {
		if (!login || login.length === 0) {
			return {
				errorText: 'Логин не должен быть пустым',
				error: true
			};
		}

		if (!login.match(/^[a-zA-Z0-9]{1,20}$/)) {
			return {
				errorText: 'Логин должен состоять из латинских букв или цифр и иметь длину не более 20 символов',
				error: true
			};
		}
		return {
			error: false
		};
	};

	const validatePassword = function (password) {
		if (!password || password.length === 0) {
			return {
				errorText: 'Пароль не должен быть пустым',
				error: true
			};
		}

		if (!password.match(/^[a-z0-9]{6,20}$/i)) {
			return {
				errorText: 'Пароль должен состоять из латинских букв или цифр и иметь длину от 6 до 20 символов',
				error: true
			};
		}
		return {
			error: false
		};
	};


	class SignForm extends Form {
		constructor(options) {
			super(options);
			this._header = new Block('h1', {
				attrs: {
					class: 'header'
				}
			});
			this._header._get().innerText = `Привет!`;
			this._header1 = new Block('h3', {});
			this._header1._get().innerText = `Залогинься или зарегистрируйся`;
			this._inputLogin = new Input({
				attrs: {
					type: 'text',
					name: 'login',
					placeholder: 'Введите свой логин'
				}
			});
			this._inputPassword = new Input({
				attrs: {
					type: 'password',
					name: 'password',
					placeholder: 'Введите свой пароль'
				}
			});
			this._inButton = new Button('Залогиниться', {});
			this._upButton = new Button('Зарегистрироваться', {});
			this._errorText = new Block('div', {
				attrs: {
					class: 'error'
				}
			});
			this.append(this._header._get());
			this.append(this._header1._get());
			this.append(this._inputLogin._get());
			this.append(this._inputPassword._get());
			this.append(this._errorText._get());
			this.append(this._inButton._get());
			this.append(this._upButton._get());
		}

		validate() {
			const isLoginValid = validateLogin(this._inputLogin.getValue());
			const isPasswordValid = validatePassword(this._inputPassword.getValue());
			if (isLoginValid.error) {
				this._errorText._get().innerText = isLoginValid.errorText;
				return false;
			}
			if (isPasswordValid.error) {
				this._errorText._get().innerText = isPasswordValid.errorText;
				return false;
			}
			return true;

		}

		// TODO комментарии в стиле JSDoc
		// регистрация
		_signup() {
			if (!this.validate()) {
				return;
			}

			const body = {
				login: this._inputLogin.getValue(),
				password: this._inputPassword.getValue(),
				email: 'api@api.com'
			};

			let params = {
				method: 'POST',
				url: 'api/users',
				attrs: ['userid'],
				body: body,
				oneMore: true
			};

			return sendToServer(params);
		}

		onSignup(callback) {
		this._upButton.on('click',function (button){
			button.preventDefault();
			callback();
		})
		}

		_signin() {
			if (!this.validate()) {
				return;
			}

			const body = {
				login: this._inputLogin.getValue(),
				password: this._inputPassword.getValue()
			};

			let params = {
				method: 'POST',
				url: 'api/sessions',
				attrs: ['userId', 'sessionid'],
				body: body,
				oneMore: false
			};
			return sendToServer(params);
		}

		onSignin(callback) {
			this._inButton.on('click', function (e) {
				e.preventDefault();
				const res = this._signin();
				if (res) {
					res.then(function () {
						debugger;
						window.localStorage.setItem('fromSign' , 'true');
						console.log('on signin callback');
						callback();
					}).catch();
				}

			}.bind(this));

		}
	}

	window.SignForm = SignForm;

})();
