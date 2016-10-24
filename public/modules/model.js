(function () {
	'use strict';

	const fetch = window.fetch;
	/**
	 *
	 */
	class Model {

		constructor(attributes = {}) {
			this.attributes = Object.assign({}, this.defaults, this._clean(attributes));
		}

		get defaults() {
			return {};
		}

		get url() {
			return '/';
		}

		/**
		 *
		 * @param method
		 * @param data
		 * @returns {Promise}
		 */

		_clean(attributes) {
			Object.keys(attributes).forEach(key => {
				if (attributes[key] === undefined) {
					delete attributes[key];
				}

				if (typeof attributes[key] === 'object' && attributes[key] !== null) {
					this._clean(attributes[key]);
				}
			});
			return attributes;
		}

		_send(url, method, data = {}) {
			return fetch('https://morning-hamlet-29496.herokuapp.com/' + url, {
				method: method,
				body: JSON.stringify(data.body),
				mode: 'cors',
				headers: {
					'Content-type': 'application/json; charset=UTF-8'
				}
			}).then(function (resp) {
				if (resp.status < 300) {
					return resp.json();
				}
				return Promise.reject(resp.json());
			}).then(function (answer) {
				console.log(answer);
				data.attrs.forEach(name => {
					window.localStorage.setItem(name.toLowerCase(), answer[name]);
				});
				if (window.localStorage.getItem('userid') === 101) {
					window.localStorage.clear();
					throw new Error();
				}
				console.log('ololol');
				if (data.oneMore) {
					this.params = {};
					let newUrl = 'api/sessions';
					this.params.attrs = ['sessionid'];
					this.params.body = {
						login : data.body.login,
						password : data.body.password
					}
					this.params.oneMore = false;
					this.save(newUrl)
				}
				console.log('ololol');
				return {};
			}.bind(this)).catch(function (data) {
				console.log(this);
				if (this.params.func === 'signin') {
					this._errorText = 'Такого пользователя не существует. Попробуйте еще раз';
				} else {
					this._errorText = 'Такого пользователя существует. Попробуйте еще раз';
				}
				return Promise.reject();
			}.bind(this));
		}

		save(url) {
			const method = 'POST';
			return this._send(url, method, this.params);
		}

		getInfo(url) {
			const method = 'GET';
			return this._send(url, method, this.params);
		}

		deleteInfo(url) {
			const method = 'DELETE';
			return this._send(url, method, this.params);
		}

		getError(){
			return this._errorText;
		}
	}

	// export
	window.Model = Model;
})();
