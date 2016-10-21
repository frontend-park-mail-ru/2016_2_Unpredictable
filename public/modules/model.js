(function () {
	'use strict';

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

		send(method, data = {}) {
			return fetch('https://morning-hamlet-29496.herokuapp.com/' + data.url, {
				method: method,
				body: JSON.stringify(this.params.body),
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
				if (data.params.oneMore) {
					data.params.url = 'api/sessions';
					data.params.attrs = ['sessionid'];
					data.params.oneMore = false;
					sendToServer.call(this);
				} else {
					return {};
				}
			}.bind(this)).catch(function (data) {
				if (this.params.func === 'signin') {
					this._errorText._get().innerText = 'Такого пользователя не существует. Попробуйте еще раз';
				} else {
					this._errorText._get().innerText = 'Такого пользователя существует. Попробуйте еще раз';
				}
				return Promise.reject();
			}.bind(this));
		}
		
		save() {
			let method = 'POST';
			return this.send(method, this.attributes);
		}

		getInfo(){
			let method = 'GET';
			return this.send(method, this.attributes);
		}

		deleteInfo(){
			let method = 'DELETE';
			return this.send(method, this.attributes);
		}
	}
	
	// export
	window.Model = Model;
})();
