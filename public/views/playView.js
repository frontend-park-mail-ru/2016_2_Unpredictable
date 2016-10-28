(function () {
	'use strict';

	const View = window.View;
	const PlayForm = window.PlayForm;

	class PlayView extends View {

		constructor() {
			debugger;
			super('js-play');
		}

		init() {
			this.playForm = new PlayForm();
			this.playForm.renderTo(this.getElement());
		}

		resume() {
			this.show();
		}
		show() {
			setTimeout(() => {
				this._el.hidden = false;
				this._el.classList.toggle('js-play--hidden', false);

			}, 301);
		}

		pause() {
			this._el.classList.toggle('js-play--hidden', true);
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

	window.PlayView = PlayView;
})();


