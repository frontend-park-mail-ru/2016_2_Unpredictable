'use strict';

import Form from '../form/form';
import Input from '../input/input';
import Button from '../button/button';
import Block from '../block/block';
import User from '../../models/UserModel';
import Link from '../link/link';
//import './mainForm.scss';

export default class MainForm extends Form {
	constructor(options) {
		super(options);
		this._header = new Block('h1', {
			attrs: {
				class: 'header'
			}
		});
		this._header._get().innerText = `TechnoOsmos`;

		this._signin = new Link('Log in/Sign up', {attrs: {href: '/sign'}});
		//this._signup = new Link('Sign up', {attrs: {href: '/reg'}});
		this._singleplayer = new Link('Single player', {attrs: {href: '/singleplayer'}});
		this._score = new Link('ScoreBoard', {attrs: {href: '/score'}});

		this.append(this._header._get());
		this.append(this._signin._get());
		//this.append(this._signup._get());
		this.append(this._singleplayer._get());
		this.append(this._score._get());
	}
}
