'use strict';

import View from '../modules/view';
import SignForm from '../components/signForm/signForm';
import RegistrationForm from '../components/registrationForm/registrationForm';
import Link from '../components/link/link';
import Block from '../components/block/block';


export default class SignView extends View {
	constructor(tag, {user}) {
		super('js-group');
		this._user = user;
		this.signForm = new SignForm(this._user);
		this.signForm._get().classList.add('js-sign');
		this.registrationForm = new RegistrationForm(this._user);
		this.registrationForm._get().classList.add('js-reg');
		this._header = new Block('h2', {
			attrs: {
				class: 'header'
			}
		});
		this._back = new Link('Go Back', {attrs: {href: 'back'}});
	}

	init() {
		this.signForm.onSignin(this.showAppForm.bind(this));
		this.registrationForm.onRegistration(this.showAppForm.bind(this));

		this._header.renderTo(this.getElement());
		this.signForm.renderTo(this.getElement());
		this.registrationForm.renderTo(this.getElement());
		this._back.renderTo(this.getElement());
	}

	showAppForm() {
		return this.router.go('/app');
	}
}
