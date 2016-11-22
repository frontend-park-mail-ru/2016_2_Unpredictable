'use strict';


export default class UsersCollection {
	constructor() {
		this._data = [];
	}

	fetchUsers() {
		return new Promise(function (resolve, reject) {
			fetch('https://nameless-wildwood-32323.herokuapp.com/api/scoreboard?limit=10', {
				method: 'GET',
				mode: 'cors',
				headers: {
					'Content-type': 'application/json; charset=UTF-8'
				}
			}).then(resp => {
				if (resp.status !== 200) {
					reject(resp);
				}
				return resp.json();
			}).then(json => {
				this._data = json;
				resolve();
			}).catch(reject);
		}.bind(this));
	}

	sort() {
		this._data = this._data.sort((a, b) => b.score - a.score);
	}

	getData() {
		return this._data;
	}

}
