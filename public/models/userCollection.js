(function () {
	'use strict';

	const Model = window.Model;

	class ScoreTable extends Model {
		constructor(attributes = {}) {
			super(attributes);
		}

		getScore() {
			// let params = {
			// 	attrs: [],
			// 	oneMore: false,
			// };
			// let url = 'api/users';
			return fetch('https://nameless-wildwood-32323.herokuapp.com/api/scoreboard?limit=10', {
				method : 'GET',
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
				return answer;
			}.bind(this)).catch(function (data) {
				if (this.params.func === 'signin') {
					this._errorText = 'Такого пользователя не существует. Попробуйте еще раз';
				} else {
					this._errorText = 'Такой пользователя существует. Попробуйте еще раз';
				}
				return Promise.reject();
			}.bind(this));
		}

	}


	window.ScoreTable = ScoreTable;


})();

