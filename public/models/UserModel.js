'use strict';


export default class User {
	constructor() {
		this.info = {
			login: null,
			score: null
		};
	}

	validateLogin(login) {
		if (!login || login.length === 0) {
			return {
				errorText: 'Login shouldn\'t be empty',
			};
		}
		if (!login.match(/^[a-zA-Z0-9]{1,20}$/)) {
			return {
				errorText: 'Login consists from latin letters and it\'s length should be more than 1 and less than 20',
			};
		}
		return {};
	}

	validatePassword(password, repeat = null) {
		if (!password || password.length === 0) {
			return {
				errorText: 'Passwords shouldn\'t be empty',
			};
		}
		if (!password.match(/^[a-z0-9]{6,20}$/i)) {
			return {
				errorText: 'Password consists from latin letters and it\'s length should be more than 6 and less than 20',
			};
		}
		return {};
	}

	checkRepeat(password, repeat = null) {
		if (repeat && repeat !== password) {
			return {
				errorText: 'Passwords are not equals',
			};
		}
		return {};
	}

	validate() {
		const isLoginValid = this.validateLogin(this.info.login);
		const isPasswordValid = this.validatePassword(this.info.password);
		const isRepeat = this.checkRepeat(this.info.password, this.info.repeat);
		this._errorText = {};
		this.error = false;
		if (isLoginValid.errorText) {
			this.error = true;
			this._errorText._errorTextLogin = isLoginValid.errorText;
		}
		if (isPasswordValid.errorText) {
			this.error = true;
			this._errorText._errorTextPassword = isPasswordValid.errorText;
		}
		if (isRepeat.errorText) {
			this.error = true;
			this._errorText._errorRepeatPassword = isRepeat.errorText;
		}
	}

	signin({login, password}, errors) {
		this.info.login = login;
		this.info.password = password;
		this.validate();
		if (this.error) {
			for (let key in this._errorText) {
				errors[key].innerText = this._errorText[key];
			}
			this.clearErrors();
			return Promise.reject();
		}
		this.errors = errors;
		return fetch(this.host + 'api/sessions', {
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({login, password}),
			mode: 'cors'
		}).then(res => {
			if (res.status >= 300) {
				throw new Error();
			}
			return Promise.resolve();
		})
			.catch(err => {
				this.errors._errorText.innerText = 'No such user. Please try again';
				return Promise.reject();
			});
	}

	signup({login, password, passwordRepeat}, errors) {
		this.info.login = login;
		this.info.password = password;
		this.info.repeat = passwordRepeat;
		this.validate();
		if (this.error) {
			for (let key in this._errorText) {
				errors[key].innerText = this._errorText[key];
			}
			this.clearErrors();
			return Promise.reject();
		}
		delete this.info.repeat;
		this.errors = errors;
		return fetch(this.host + 'api/users', {
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({login, password}),
			mode: 'cors'
		}).then(res => {
			if (res.status >= 200) {
				throw new Error();
			}
			return Promise.resolve();
		}).catch(err => {
			this.errors._errorText.innerText = 'User with this login already exist. Please try again';
			return Promise.reject();
		});
	}

	logout() {
		return new Promise(function (resolve, reject) {
			fetch(this.host + 'api/delete', {
				credentials: 'include',
				method: 'DELETE',
				mode: 'cors'
			}).then(res => {
				if (res.status !== 200) {
					console.info('не разлогинились');
					return reject();
				}
				return res.json().then(body => {
					console.info('Разлогинились');
					return resolve();
				});
			}).catch(err => {
				console.error(err);
				console.info('какаято ошибка');
				return reject(err);
			});
		}.bind(this));
	}

	get login() {
		return this.info.login;
	}

	get score() {
		return this.info.score;
	}

	set score(value) {
		this.info.score = value;
	}

	set login(value) {
		this.info.login = value;
	}

	checkAutorization() {
		return new Promise(function (resolve, reject) {
			fetch(this.host + 'api/me', {
				credentials: 'include',
				method: 'GET',
				mode: 'cors'
			}).then(res => {
				if (res.status !== 200) {
					console.info('МЫ не авторизованы!! meh =(');
					return reject();
				}
				return res.json().then(body => {
					this.login = body.login;
					this.score = body.score;
					console.info('МЫ авторизованы!! УХУ');
					return resolve();
				});
			}).catch(err => {
				console.error(err);
				console.info('МЫ не авторизованы!! какаято ошибка =((( meh =(');
				return reject(err);
			});
		}.bind(this));
	}

	setHost(host) {
		this.host = host;
	}

	clearErrors() {
		this._errorText = {};
	}

}