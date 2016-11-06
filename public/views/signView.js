(function () {
	'use strict';

	const SignForm = window.SignForm;
	const View = window.View;

	class SignView extends View {
		constructor() {
			super('js-sign');
			this.signForm = new SignForm();
		}

		/**
		 * Инициализация вьюшки
		 * @param model - модкль юзера
		 */
		init(model = {}) {
			this.signForm.clearInputErrors();
			this.user = model.user;
			this.signForm.onSignin(this.showAppForm.bind(this), this.user);
			this.signForm.onSignup(this.showRegForm.bind(this), this.user);
			this.signForm.renderTo(this.getElement());
		}

		/**
		 * Вызывается при переходе на вьюшку
		 * @param options - модель юзера
		 */
		resume(options = {}) {
			this.signForm.clearInputErrors();
			this.user.fromSign = true;
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

		showMain(){
			this.pause();
			return this.router.go('/', this.user);
		}

		/**
		 * Загружает вьюшку
		 */
		show() {
			setTimeout(() => {
				this._el.hidden = false;
				this._el.classList.toggle('js-sign--hidden', false);

			}, 301);
		}


		pause() {
			this._el.classList.toggle('js-sign--hidden', true);
			this.hide();
		}

		hide() {
			setTimeout(() => {
				this._el.hidden = true;
			}, 300);
		}

	}

	window.SignView = SignView;
})();
