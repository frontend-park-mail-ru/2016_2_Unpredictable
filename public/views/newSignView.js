'use strict';

import SignForm from '../components/signForm/signForm';
import RegistrationForm from '../components/registrationForm/registrationForm.css';
import Button from '../components/button/button';
import View from '../modules/view';
import Block from '../components/block/block';

export default class newSignView extends View {
	constructor() {
		super('js-group');
		this.signForm = new SignForm();
		this.signForm._get().classList.add('js-sign');
		this.regForm = new RegistrationForm();
		this.regForm._get().classList.add('js-reg');
	}

	/**
	 * Инициализация вьюшки
	 * @param model - модкль юзера
	 */
	init(model = {}) {
		this.user = model.user;
		this._header2 = new Block('h1', {
			attrs: {
				class: 'header'
			}
		});
		this._header2._get().innerText = `TechnoOsmos`;
		this.signForm.onSignin(this.showAppForm.bind(this), this.user);
		this.regForm.onRegistration(this.showAppForm.bind(this), this.user);
		this.getElement().appendChild(this._header2._get());
		this.signForm.renderTo(this.getElement());
		this.regForm.renderTo(this.getElement());
		this._back = new Link('Go Back', {attrs: {href: 'back'}});
		this.getElement().appendChild(this._back._get());
	}

	/**
	 * Вызывается при переходе на вьюшку
	 * @param options - модель юзера
	 */
	resume(options = {}) {
		this.signForm.clearInputErrors();
		this.regForm.clearInputErrors();
		this.show();
	}


	/**
	 * Переход на страницу приложения
	 * @returns {*} - вьюшка по /app урлу
	 */
	showAppForm() {
		this.pause();
		return this.router.go('/app', this.user);
	}

	/**
	 * Переход на страницу - регистрации
	 * @returns {*} - вьюшка по /signup урлу
	 */
	showRegForm() {
		this.pause();
		return this.router.go('/signup', this.user);
	}

	/**
	 * Переход на /app урл
	 * @returns {*} - вьюшка по /app урлу
	 */
	showAppForm() {
		return this.router.go('/app', this.user);
	}

	/**
	 * Загружает вьюшку
	 */
	show() {
		setTimeout(() => {
			this._el.hidden = false;
			this.signForm._get().classList.toggle('js-sign--hidden', false);
			this.regForm._get().classList.toggle('js-reg--hidden', false);
		}, 301);
	}


	pause() {
		this.signForm._get().classList.toggle('js-sign--hidden', true);
		this.regForm._get().classList.toggle('js-reg--hidden', true);
		this.hide();
	}

	hide() {
		setTimeout(() => {
			this._el.hidden = true;
		}, 300);
	}


	showMain() {
		return this.router.go('/');
	}

}
