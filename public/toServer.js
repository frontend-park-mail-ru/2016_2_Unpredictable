(function () {
	'use strict';

	function sendToServer(params) {

		const fetch = window.fetch;

		return fetch('https://morning-hamlet-29496.herokuapp.com/' + params.url, {
			method: params.method,
			body: JSON.stringify(params.body),
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
			params.attrs.forEach(name => {
				window.localStorage.setItem(name.toLowerCase(), answer[name]);
			});
			if (params.oneMore === true) {
				const newParams = {
					url: 'api/sessions',
					method: 'POST',
					attrs: ['sessionid'],
					body: params.body,
					oneMore: false
				};
				sendToServer(newParams);
			} else {
				return {};
			}
		}).catch(function (data) {
			try {
				this._errorText._get().innerText = 'Неизвестная ошибка. Попробуйте позже';
			} catch (_) {
				this._errorText._get().innerText = 'Неизвестная ошибка. Попробуйте позже';
			}
			return Promise.reject();
		}.bind(this));
	}

	window.sendToServer = sendToServer;
})();
