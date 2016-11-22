'use strict';

import View from '../modules/view';
import Link from '../components/link/link';
import template from '../templates/scoreboard.tmpl.xml';
import UsersCollection from '../collections/UsersCollection';
import '../css/scoreboard.scss';
let pageNumber = 1;

export default class ScoreboardView extends View {
	constructor(tag, {user}) {
		super('js-score');
		this._user = user;
		this._back = new Link('Go Back', {attrs: {href: 'back'}});
		this._users = new UsersCollection();
	}

	// init() {
	// 	this._el.innerHTML = '';
	// 	this._users.fetchUsers()
	// 		.then(() => {
	// 			this._users.getData();
	// 			this._users.sort();
	// 			this.takePart();
	// 			this._el.innerHTML = template({items: this._ourUsers});
	// 			this._back.renderTo(this.getElement());
	// 			this._next.renderTo(this.getElement());
	// 			this._prev.renderTo(this.getElement());
	//
	// 		});
	// }
	//
	// takePart(){
	// 	const part = 10;
	// 	this._next = new Link('Next', {attrs: {href: `score/$(pageNumber++)/`}});
	// 	this._prev = new Link('Prev', {attrs: {href: `score/$(pageNumber--)/`}});
	// 	if (pageNumber <= 1) {
	// 		this._prev.setAttribute('style', 'display: none;');
	// 		pageNumber = 1;
	// 		this._ourUsers = this._users.slice(0,part);
	// 	} else {
	// 		this._ourUsers = this._users.slice(pageNumber*part, pageNumber*part+part);
	// 	}
	//
	// }
}
