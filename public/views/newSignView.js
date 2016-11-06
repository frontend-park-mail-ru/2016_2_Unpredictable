(function () {
	'use strict';

	const SignForm = window.SignForm;
	const RegistrationForm = window.RegistrationForm;
	const Button = window.Button;
	const View = window.View;
	const Block = window.Block;

	class newSignView extends View {
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
			this.button = new Button('Back', {});
			this.onBack(this.showMain.bind(this));
			this.getElement().appendChild(this.button._get());
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
			setTimeout( () => {
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

		onBack(callback){
			this.button.on('click', function(button){
				button.preventDefault();
				callback();
			}.bind(this))
		}

		showMain() {
			console.log(this._el);
			return this.router.go('/');
		}

	}

	window.newSignView = newSignView;
})();
