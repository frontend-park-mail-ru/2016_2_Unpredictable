'use strict';

import '../css/sign-view.scss';
import View from '../modules/view';
import template from '../templates/sign.tmpl.xml';


export default class SignView extends View {
	/**
	 * Конструктор sign view
	 * @param tag
	 * @param {User} user - модель юзера
	 * @param {String} host - базовый хост бекенда
	 */
	constructor(tag, {user, host}) {
		super('js-group');
		this._user = user;
		this._el.innerHTML = template();

		this.signinLogin = this._el.querySelector('.signin__login-input');
		this.signinPassword = this._el.querySelector('.signin__password-input');
		this.signinSubmit = this._el.querySelector('.signin__submit');

		this.signupLogin = this._el.querySelector('.signup__login-input');
		this.signupPassword = this._el.querySelector('.signup__password-input');
		this.signupPasswordRepeat = this._el.querySelector('.signup__password-repeat');
		this.signupSubmit = this._el.querySelector('.signup__submit');

		this.signinSubmit.addEventListener('click', this.handleSignIn.bind(this));
		this.signupSubmit.addEventListener('click', this.handleSignUp.bind(this));
	}

	/**
	 * Обработчик нажатия на кнопку Sign in
	 */
	handleSignIn(e) {
		e.preventDefault();
		const formdata = {
			login: this.signinLogin.value,
			password: this.signinPassword.value,
		};

		this.signinLogin.value = '';
		this.signinPassword.value = '';

		this._user.signin(formdata)
			.then(() => {
				this.router.go('/app');
			})
			.catch(() => {
				alert('ПРОБЛЕМА при авторизации');
			});

		return false;
	}

	/**
	 * Обработчик нажатия на кнопку Sign up
	 */
	handleSignUp(e) {
		e.preventDefault();
		const formdata = {
			login: this.signupLogin.value,
			password: this.signupPassword.value,
			passwordRepeat: this.signupPasswordRepeat.value,
		};

		this.signupLogin.value = '';
		this.signupPassword.value = '';
		this.signupPasswordRepeat.value = '';

		this._user.signup(formdata)
			.then(() => {
				this.router.go('/app');
			})
			.catch(() => {
				alert('ПРОБЛЕМА при регистрации');
			});

		return false;
	}
}
