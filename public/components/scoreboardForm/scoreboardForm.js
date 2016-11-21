'use strict';

import Form from '../form/form';
import Input from '../input/input';
import Button from '../button/button';
import Block from '../block/block';
import User from '../../models/userModel';
import Link from '../link/link';
import UsersCollection from '../../models/userCollection';
import template from '../../templates/scoreboard.tmpl.xml';

export default class ScoreForm extends Form {
	constructor(options) {
		super(options);

		this._back = new Link('Go Back', {attrs: {href: 'back'}});
		this._users = new UsersCollection();
		this._users.sort();
		this._el.innerHTML = template({items: this._users.getData()});
		this.append(this._back._get());

	}
}


