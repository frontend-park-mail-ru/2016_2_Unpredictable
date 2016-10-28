(function () {
	'use strict';

	const View = window.View;
	const UsersCollection = window.UsersCollection;
	const fest = window.fest['templates/scoreboard'];
	const ScoreForm = window.ScoreForm;

	class ScoreView extends View {

		constructor() {
			super('js-score');
		}

		init() {
			this.scoreForm = new ScoreForm();
			this.scoreForm.renderTo(this.getElement());
		}

		resume() {
			this.show();
		}


		show() {
			setTimeout(() => {
				this._el.hidden = false;
				this._el.classList.toggle('js-score--hidden', false);

			}, 301);
		}

		pause() {
			this._el.classList.toggle('js-score--hidden', true);
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

	window.ScoreView = ScoreView;
})();
