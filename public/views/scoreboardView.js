'use strict';

import View from '../modules/view';
import Link from '../components/link/link';
import template from '../templates/scoreboard.tmpl.xml';
import UsersCollection from '../collections/UsersCollection';
import '../css/scoreboard.scss';


export default class ScoreboardView extends View {
	constructor(tag, {user}) {
		super('js-score');
		this._user = user;
		this._back = new Link('Go Back', {attrs: {href: 'back'}});
		this._users = new UsersCollection();

	}

	init() {
		this._el.innerHTML = '';
		this._users.fetchUsers()
			.then(() => {
				console.log({items: this._users.getData()});
				this._el.innerHTML = template({items: this._users.getData()});
				this._back.renderTo(this.getElement());
			});
	}
}
