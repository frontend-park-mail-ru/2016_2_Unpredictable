(function () {
	'use strict';

	const View = window.View;
	const MainForm = window.MainForm;

	class MainView extends View {

		constructor() {
			super('js-main');
		}

		init() {
			this.mainForm = new MainForm();
			this.mainForm.renderTo(this.getElement());
		}

		resume() {
			this.show();
		}

		show() {
			setTimeout(() => {
				this._el.hidden = false;
				this._el.classList.toggle('js-main--hidden', false);

			}, 301);
		}

		pause() {
			this._el.classList.toggle('js-main--hidden', true);
			this.hide();
		}

		hide() {
			setTimeout(() => {
				this._el.hidden = true;
			}, 300);
		}

		showSignForm() {
			return this.router.go('/');
		}


	}

	window.MainView = MainView;
})();
