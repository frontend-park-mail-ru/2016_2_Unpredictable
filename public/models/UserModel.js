'use strict';


export default class User {
	constructor() {
		this.info = {
			login: null,
			score: null
		};
	}

	signin({login, password}) {
		console.log('sign in', arguments);
		return new Promise(function (resolve, reject) {
			if (!login) {
				console.info('плохое имя');
				return reject();
			}
			if (!password || password.length < 6) {
				console.info('плохое passw');
				return reject();
			}
			fetch(this.host + 'api/login', {
				credentials: 'include',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({login, password}),
				mode: 'cors'
			}).then(res => {
				if (res.status !== 200) {
					console.info('не верная пара');
					return reject();
				}
				return res.json().then(body => {
					this.login = body.login;
					this.score = body.score;
					console.info('вошли');
					return resolve();
				});
			}).catch(err => {
				console.error(err);
				console.info('какаято ошибка =((( ');
				return reject(err);
			});
		}.bind(this));
	}

	signup({login, password, passwordRepeat}) {
		console.log('sign up', arguments);
		return new Promise(function (resolve, reject) {
			if (!login) {
				console.info('плохое имя');
				return reject();
			}
			if (!password || password.length < 6) {
				console.info('плохой пароль');
				return reject();
			}
			if (passwordRepeat !== password) {
				console.info('пароли не совпадают ');
				return reject();
			}
			fetch(this.host + 'api/users', {
				credentials: 'include',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({login, password}),
				mode: 'cors'
			}).then(res => {
				if (res.status !== 200) {
					console.info('пользователь уже существует или какая то хрень');
					return reject();
				}
				return res.json().then(body => {
					this.login = body.login;
					this.score = body.score;
					console.info('зарегались');
					return resolve();
				});
			}).catch(err => {
				console.error(err);
				console.info('какаято ошибка =((( ');
				return reject(err);
			});
		}.bind(this));
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

}
