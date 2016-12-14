'use strict';

import '../css/sign.scss';
import View from '../modules/view';
import template from '../templates/sign.tmpl.xml';
import '../components/input/input.scss';


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
		this.signinError = this._el.querySelector('.signin__error');
		this.signinSubmit = this._el.querySelector('.signin__submit');
		this.signupLogin = this._el.querySelector('.signup__login-input');

		this.signupName = this._el.querySelector('.signup__name-input');
		this.signupEmail = this._el.querySelector('.signup__email-input');
		this.signupPassword = this._el.querySelector('.signup__password-input');
		// this._inErrorTextLogin = this._el.querySelector('.signin__login_error');
		// this._inErrorTextPassword = this._el.querySelector('.signin__password_error');
		// this._inErrorText = this._el.querySelector('.signin__invalid_data');
		// this.inErrors = {
		// 	_errorTextLogin: this._inErrorTextLogin,
		// 	_errorTextPassword: this._inErrorTextPassword,
		// 	_errorText: this._inErrorText
		// };
		this.signupPasswordRepeat = this._el.querySelector('.signup__password-repeat');

		this.signupError = this._el.querySelector('.signup__error');
		this.signupSubmit = this._el.querySelector('.signup__submit');
		// this._upErrorTextLogin = this._el.querySelector('.signup__login_error');
		// this._upErrorTextPassword = this._el.querySelector('.signup__password_error');
		// this._upErrorTextRepaeat = this._el.querySelector('.signup__password_repeat_error');
		// this._upErrorText = this._el.querySelector('.signup__invalid_data');
		// <p class="signin__error"></p>>

		this.signinSubmit.addEventListener('click', this.handleSignIn.bind(this));
		this.signupSubmit.addEventListener('click', this.handleSignUp.bind(this));
	}

	/**
	 * Обработчик нажатия на кнопку Sign in
	 */
	handleSignIn(e) {
		this.clearInputErrors();
		e.preventDefault();
		const formdata = {
			login: this.signinLogin.value,
			password: this.signinPassword.value,
		};

		this.signinPassword.value = '';

		this._user.signin(formdata)
			.then(() => {
				this.router.go('/app');
			}).catch((errors) => {

				this.signinError.innerText = errors;
				console.log('There are some errors in your data, check them and try one more time');
			});
		return false;
	}

	/**
	 * Обработчик нажатия на кнопку Sign up
	 */
	handleSignUp(e) {
		this.clearInputErrors();
		e.preventDefault();
		const formdata = {
			login: this.signupLogin.value,
			// name: this.signupName.value,
			// email: this.signupEmail.value,
			password: this.signupPassword.value,
			passwordRepeat: this.signupPasswordRepeat.value,
		};

		this.signupPassword.value = '';
		this.signupPasswordRepeat.value = '';

		this._user.signup(formdata)
			.then(() => {
				this.router.go('/app');
			}).catch((errors) => {
				console.log(errors);
				this.signupError.innerText = errors;
				console.log('There are some errors in your data, check them and try one more time');
			});
		return false;
	}

	clearInputErrors() {

		this.signinError.innerText = '';
		this.signupError.innerText = '';

	}
}
