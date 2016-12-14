'use strict';

import View from '../modules/view';
import Link from '../components/link/link';
import template from '../templates/scoreboard.tmpl.xml';
import UsersCollection from '../collections/UsersCollection';
import '../css/scoreboard.scss';

export default class ScoreboardView extends View {
	constructor(tag, {user, host}) {
		super('js-score');
		this._user = user;
		this._back = new Link('Go Back', {attrs: {href: '/'}});
		// TODO: назад при авторизованном пользователе

		this._users = new UsersCollection();
		this._users.setHost(host);
		this.pageNumber = 1;
	}

	init() {
		this._el.innerHTML = '';
	}

	resume({page = 1}) {
		super.resume();
		this.showPreloader();
		this._users.fetchUsers()
			.then(() => {
				this._users.sort();
				this.usersArray = this._users.getData();
				this.takePart(page);
				this._el.innerHTML = template({items: this._ourUsers});
				this._prev.renderTo(this.getElement());
				this._next.renderTo(this.getElement());
				this._back.renderTo(this.getElement());
				this.hidePreloader();
			});
	}

	showPreloader() {
		console.log('showPreloader');
	}

	hidePreloader() {
		console.log('hidePreloader');
	}


	takePart(pageNumber) {
		const part = 5;
		this._next = new Link('>>', {attrs: {href: `/score/${+pageNumber + 1}`}});
		this._prev = new Link('<<', {attrs: {href: `/score/${+pageNumber - 1}`}});
		this._prev._get().setAttribute('class', 'pagination ');
		this._next._get().setAttribute('class', 'pagination ');


		console.log(this.usersArray.length);
		if (pageNumber <= 1) {
			this._prev._get().setAttribute('style', 'display: none;');
			pageNumber = 1;
			this._ourUsers = this.usersArray.slice(0, part);

		} else {
			this._ourUsers = this.usersArray.slice((pageNumber - 1) * part,
				((pageNumber - 1) * part) + part);
		}
		if (pageNumber >= (this.usersArray.length / part)) {

			this._next._get().setAttribute('style', 'display: none;');
		}

	}
}
