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
			this.mainForm.onAuth(this.showAuth.bind(this));
			this.mainForm.onSingle(this.showSignForm.bind(this));
			this.mainForm.onScore(this.showScore.bind(this));
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

		showScore(){
			this.pause();
			return this.router.go('/score');
		}

		showAuth(){
			this.pause();
			return this.router.go('/authorization');
		}

		showSignForm() {
			this.pause()
		}


	}

	window.MainView = MainView;
})();


