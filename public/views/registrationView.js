(function () {
	'use strict';

	const RegistrationForm = window.RegistrationForm;
	const View = window.View;

	class RegView extends View {
		constructor() {
			super('js-reg');
			this.regForm = new RegistrationForm();
		}

		/**
		 * Инициализация вьюшки
		 * @param model - модель юзера
		 */
		init(model = {}) {
			this.user = model.user;
			this.regForm.onRegistration(this.showAppForm.bind(this), this.user);
			this.regForm.onBack(this.showSignForm.bind(this), this.user);
			this.regForm.renderTo(this.getElement());
		}

		/**
		 * Вызвается при переходе на вьюшку (переопределена)
		 * @param model - модель юзера
		 */
		resume(model = {}) {
			this.regForm.clearInputErrors();
			this.show();

		}

		/**
		 * Рендерить вьюшку
		 */
		show() {
			setTimeout(() => {
				this._el.hidden = false;
				this._el.classList.toggle('js-reg--hidden', false);
			}, 301);
		}

		/**
		 * Вызывается при уходе со вьюшки
 		 */
		pause() {
			this._el.classList.toggle('js-reg--hidden', true);
			this.hide();
		}

		/**
		 * Прячет вьюшку
		 */
		hide() {
			setTimeout(() => {
				this._el.hidden = true;
			}, 300);
		}

		/**
		 * Переход на /app урл
		 * @returns {*} - вьюшка по /app урлу
		 */
		showAppForm() {
			this.hide();
			return this.router.go('/app', this.user);
		}

		/**
		 * Переход на / урл
		 * @returns {*} - вьюшка по / урлу
		 */
		showSignForm() {
			this.hide();
			return this.router.go('/', this.user);
		}

	}

	window.RegView = RegView;
})();

