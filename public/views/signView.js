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
		this._header = new Block('h1', {
			attrs: {
				class: 'header'
			}
		});
		this._header._get().innerText = `TechnoOsmos`;
		this.signForm = new SignForm(this._user);
		this.signForm._get().classList.add('js-sign__form');
		this.registrationForm = new RegistrationForm(this._user);
		this.registrationForm._get().classList.add('js-reg__form');
		this._back = new Link('Go Back', {attrs: {href: 'back'}});
	}

	init() {

		this._header.renderTo(this.getElement());
		this.signForm.onSignin(this.showAppForm.bind(this));
		this.registrationForm.onRegistration(this.showAppForm.bind(this));
		this.signForm.renderTo(document.querySelector('.js-sign'));
		this.registrationForm.renderTo(document.querySelector('.js-reg'));
		this._back.renderTo(this.getElement());
	}

	showAppForm() {
		return this.router.go('/app');
	}
}
