'use strict';

import '../css/sign.scss';
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
		//this.signinError = this._el.querySelector('.signin__error');
		this.signinSubmit = this._el.querySelector('.signin__submit');

		this.signupLogin = this._el.querySelector('.signup__login-input');
		this.signupPassword = this._el.querySelector('.signup__password-input');
		this.signupPasswordRepeat = this._el.querySelector('.signup__password-repeat');
		//this.signupError = this._el.querySelector('.signup__error');
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




// 'use strict';
//
// import View from '../modules/view';
// import SignForm from '../components/signForm/signForm';
// import RegistrationForm from '../components/registrationForm/registrationForm';
// import Link from '../components/link/link';
// import Block from '../components/block/block';
//
//
// export default class SignView extends View {
// 	constructor(tag, {user}) {
// 		super('js-sign');
// 		this._header = new Block('h1', {
// 			attrs: {
// 				class: 'header'
// 			}
// 		});
// 		this._header._get().innerText = `TechnoOsmos`;
// 		this._user = user;
// 		this.signForm = new SignForm(this._user);
// 		this.signForm._get().classList.add('js-sign__form');
// 		this.registrationForm = new RegistrationForm(this._user);
// 		this.registrationForm._get().classList.add('js-reg__form');
//
// 		this._back = new Link('Go Back', {attrs: {href: 'back'}});
// 	}
//
// 	init() {
// 		this.signForm.onSignin(this.showAppForm.bind(this));
// 		this.registrationForm.onRegistration(this.showAppForm.bind(this));
// 		//this._header.renderTo(this.getElement());
// 		// this.signForm.renderTo(document.querySelector('.js-sign'));
// 		// this.registrationForm.renderTo(document.querySelector('.js-reg'));
// 		// this._back.renderTo(this.getElement());
// 	}
//
// 	showAppForm() {
// 		return this.router.go('/app');
// 	}
// }
//
//
//
// // 'use strict';
// //
// // //import '../css/sign-view.scss';
// // import View from '../modules/view';
// // //import template from '../templates/sign.tmpl.xml';
// //
// //
// // export default class SignView extends View {
// // 	/**
// // 	 * Конструктор sign view
// // 	 * @param tag
// // 	 * @param {User} user - модель юзера
// // 	 * @param {String} host - базовый хост бекенда
// // 	 */
// // 	constructor(tag, {user, host}) {
// // 		super('js-group');
// // 		this._user = user;
// // 		this._el.innerHTML = template();
// //
// // 		this.signinLogin = this._el.querySelector('.signin__login-input');
// // 		this.signinPassword = this._el.querySelector('.signin__password-input');
// // 		this.signinSubmit = this._el.querySelector('.signin__submit');
// //
// // 		this.signupLogin = this._el.querySelector('.signup__login-input');
// // 		this.signupPassword = this._el.querySelector('.signup__password-input');
// // 		this.signupPasswordRepeat = this._el.querySelector('.signup__password-repeat');
// // 		this.signupSubmit = this._el.querySelector('.signup__submit');
// //
// // 		this.signinSubmit.addEventListener('click', this.handleSignIn.bind(this));
// // 		this.signupSubmit.addEventListener('click', this.handleSignUp.bind(this));
// // 	}
// //
// // 	/**
// // 	 * Обработчик нажатия на кнопку Sign in
// // 	 */
// // 	handleSignIn(e) {
// // 		e.preventDefault();
// // 		const formdata = {
// // 			login: this.signinLogin.value,
// // 			password: this.signinPassword.value,
// // 		};
// //
// // 		this.signinLogin.value = '';
// // 		this.signinPassword.value = '';
// //
// // 		this._user.signin(formdata)
// // 			.then(() => {
// // 				this.router.go('/app');
// // 			})
// // 			.catch(() => {
// // 				alert('ПРОБЛЕМА при авторизации');
// // 			});
// //
// // 		return false;
// // 	}
// //
// // 	/**
// // 	 * Обработчик нажатия на кнопку Sign up
// // 	 */
// // 	handleSignUp(e) {
// // 		e.preventDefault();
// // 		const formdata = {
// // 			login: this.signupLogin.value,
// // 			password: this.signupPassword.value,
// // 			passwordRepeat: this.signupPasswordRepeat.value,
// // 		};
// //
// // 		this.signupLogin.value = '';
// // 		this.signupPassword.value = '';
// // 		this.signupPasswordRepeat.value = '';
// //
// // 		this._user.signup(formdata)
// // 			.then(() => {
// // 				this.router.go('/app');
// // 			})
// // 			.catch(() => {
// // 				alert('ПРОБЛЕМА при регистрации');
// // 			});
// //
// // 		return false;
// // 	}
// // }
