'use strict';


export default class User {
	constructor(body = {}, attributes = {}) {
		this.body = body;
	}

	validateLogin(login) {
		if (!login || login.length === 0) {
			return {
				errorText: 'Логин не должен быть пустым',
			};
		}
		if (!login.match(/^[a-zA-Z0-9]{1,20}$/)) {
			return {
				errorText: 'Логин должен состоять из латинских букв или цифр и иметь длину не более 20 символов',
			};
		}
		return {};
	}

	validatePassword(password, repeat = null) {
		if (!password || password.length === 0) {
			return {
				errorText: 'Пароль не должен быть пустым',
			};
		}
		if (!password.match(/^[a-z0-9]{6,20}$/i)) {
			return {
				errorText: 'Пароль должен состоять из латинских букв или цифр и иметь длину от 6 до 20 символов',
			};
		}
		if (repeat && repeat !== password) {
			return {
				errorText: 'Пароли не совпадают',
			};
		}
		return {};
	}

	validate() {
		const isLoginValid = this.validateLogin(this.info.login);
		const isPasswordValid = this.validatePassword(this.info.password,
			this.info.repeatPassword);
		let error = false;
		if (isLoginValid.errorText) {
			error = true;
			this._errorText._errorTextLogin = isLoginValid.errorText;
		}
		if (isPasswordValid.errorText) {
			error = true;
			this._errorText._errorTextPassword = isPasswordValid.errorText;
		}
		return error;
	}

	signin() {
		const validation = this.validate();
		if (validation.error) {
			this._errorText = {};
			for (const key in validation) {
				if (key !== 'error') {
					this._errorText[key] = validation[key];
				}
			}
			return;
		}
		let params = {
			attrs: ['userId', 'sessionid'],
			body: this.body,
			oneMore: false,
			func: 'signin'
		};
		let url = 'api/sessions';
		return this.save(url, params);
	}

	signup() {
		const validation = this.validate();
		if (validation.error) {
			this._errorText = {};
			for (const key in validation) {
				if (key !== 'error') {
					this._errorText[key] = validation[key];
				}
			}
			return;
		} else {
			this._errorText = null;
		}
		let params = {
			attrs: ['userid'],
			body: this.info,
			oneMore: true,
			func: 'signup'
		};
		let url = 'api/users';
		return this.save(url, params);

	}

	logout(sessionid) {
		return this.deleteInfo(sessionid);
	}

	setUserInfo(newInfo) {
		this.info = newInfo;
	}

	clear() {
		this.info = {};
	}

	getLogin() {
		return this.info.login;
	}

}
