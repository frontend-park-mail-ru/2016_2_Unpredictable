'use strict';

import View from '../modules/view';
import AppForm from '../components/appForm/appForm';


export default class AppView extends View {
	constructor(tag, {user}) {
		super('js-app');
		this._user = user;
	}

	init() {
		// // TODO атата!
		//
		// const _a = function (userInfo) {
		// 	window.localStorage.setItem('login', userInfo.login);
		// 	this.appForm = new AppForm({name: window.localStorage.getItem('login')});
		// 	this.appForm.onLogout(this.showSignForm.bind(this));
		// 	this.appForm.renderTo(this.getElement());
		// };
		// const userid = window.localStorage.getItem('userid');
		// if (!userid) {
		// 	window.localStorage.removeItem('fromSign');
		// 	return {};
		// }
		// // 'https://morning-hamlet-29496.herokuapp.com/api/users/'
		// return fetch(options.host + userid, {
		// 	method: 'GET',
		// 	mode: 'cors'
		// })
		// 	.then(function (resp) {
		// 		if (resp.status < 300) {
		// 			return resp.json();
		// 		}
		// 	})
		// 	.then(_a.bind(this));
	}

	resume() {
		console.log('appView resume');
		super.resume();
		// if (window.localStorage.getItem('fromSign') === null) {
		// 	this.showSignForm();
		// } else {
		// 	this.show();
		// }
	}

}
