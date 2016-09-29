(function () {
	'use strict';

	const Form = window.Form;
	const Input = window.Input;
	const Button = window.Button;
	const Block = window.Block;

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
			this._inputLogin = new Input({
				attrs: {
					type: 'text',
					name: 'login'
				}
			});
			this._inputPassword = new Input({
				attrs: {
					type: 'password',
					name: 'password'
				}
			});
			this._inButton = new Button('Sign in', {});
			this._upButton = new Button('Sign up', {});
			this._errorText = new Block('div', {});
			//this.append(greating._get());
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
				password: this._inputPassword.getValue()
			};

			return fetch('/api/users', {
				method: 'POST',
				body: JSON.stringify(body),
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				}
			}).then(function (resp) {
				return resp.json();
			}).then(function (user) {
				console.log(user);
				window.localStorage.setItem('userid', user.userid);
				return fetch('/api/sessions', {
					method: 'POST',
					body: JSON.stringify(body),
					headers: {
						"Content-type": "application/json; charset=UTF-8"
					}
				});
			}).then(function (resp) {
				return resp.json();
			}).then(function (session) {
				console.log(session);
				window.localStorage.setItem('sessionid', session.sessionid);

			}).catch(function (resp) {
				this._errorText._get().innerText = JSON.parse(resp.body).error || 'Неизвестная ошибка. Попробуйте позже';
			}.bind(this));
		}

		onSignup(callback) {
			this._upButton.on('click', function (e) {
				e.preventDefault();
				const res = this._signup();
				if (res) {
					res.then(function () {
						callback();
					});
				}
			}.bind(this));
		}

		_signin() {
			if (!this.validate()) {
				return;
			}

			const body = {
				login: this._inputLogin.getValue(),
				password: this._inputPassword.getValue()
			};

			return fetch('/api/sessions', {
				method: 'POST',
				body: JSON.stringify(body),
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				}
			}).then(function (resp) {
				return resp.json();
			}).then(function (session) {
				console.log(session);
				window.localStorage.setItem('userid', session.userid);
				window.localStorage.setItem('sessionid', session.sessionid);

			}).catch(function (resp) {
				this._errorText._get().innerText = JSON.parse(resp.body).error || 'Неизвестная ошибка. Попробуйте позже';
			}.bind(this));
		}

		onSignin(callback) {
			this._inButton.on('click', function (e) {
				e.preventDefault();
				const res = this._signin();
				if (res) {
					res.then(function () {
						callback();
					});
				}
			}.bind(this));
		}
	}

	window.SignForm = SignForm;

})();