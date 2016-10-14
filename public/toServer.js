(function () {
	'use strict';
	const fetch = window.fetch;

	function sendToServer() {

		console.log(this);
		return fetch('https://morning-hamlet-29496.herokuapp.com/' + this.params.url, {
			method: this.params.method,
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
			this.params.attrs.forEach(name => {
				window.localStorage.setItem(name.toLowerCase(), answer[name]);
			});
			if (window.localStorage.getItem('userid') == 101)
				throw new Error() ;
			if (this.params.oneMore == true) {
				this.params.url = 'api/sessions';
				this.params.attrs = ['sessionid'];
				this.params.oneMore = false;
				sendToServer.call(this);
			} else {
				return {};
			}
		}.bind(this)).catch(function (data) {
			if(this.params.func == 'signin')
				this._errorText._get().innerText = 'Такого пользователя не существует. Попробуйте еще раз';
			else
				this._errorText._get().innerText = 'Такого пользователя существует. Попробуйте еще раз';
			return Promise.reject();
		}.bind(this));
	}

	window.sendToServer = sendToServer;
})();
