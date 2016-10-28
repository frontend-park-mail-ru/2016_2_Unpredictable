(function () {
	'use strict';

	const fetch = window.fetch;
	const AppForm = window.AppForm;
	const View = window.View;

	class AppView extends View {
		constructor() {
			super('js-app');
		}

		/**
		 * Инициализация вьюшки (переопределение)
		 * @param model - объект юзера
		 */
		init(model = {}) {
			this.user = model.user;
		}

		/**
		 * Вызывается при каждом переходе на вьюшку(переопределена)
		 */
		resume() {
			if (!this.user.fromSign) {
				this.showSignForm();
			} else {
				if (this.user.getLogin()) {
					this.appForm = new AppForm({
						name: this.user.getLogin()
					});
					this.appForm.onLogout(this.showSignForm.bind(this), this.user);
					this.appForm.onScore(this.showScoreTable.bind(this));
					this.appForm.renderTo(this.getElement());
				}
				this.show();
			}
		}

		/**
		 * Делает блок видимым
		 */
		show() {
			setTimeout(() => {
				this._el.hidden = false;
				this._el.classList.toggle('js-app--hidden', false);

			}, 301);
		}

		/**
		 * Вызывается при уходе с вьюшки
		 */
		pause() {
			if (this.user.fromSign) {
				this.getElement().removeChild(this.appForm._get());
			}
			this._el.classList.toggle('js-app--hidden', true);
			this.hide();
		}

		/**
		 * Скрывает вьюшку
		 */
		hide() {
			setTimeout(() => {
				this._el.hidden = true;
			}, 300);
		}

		/**
		 * Переход на таблицу рекордов
		 * @returns {*} -
		 */
		showScoreTable(){
			this.router.go('/score/', this.user);
		}

		/**
		 *Переход на главный экран
		 * @returns {*}
		 */
		showSignForm() {
			return this.router.go('/', this.user);
		}

	}

	window.AppView = AppView;
})();
