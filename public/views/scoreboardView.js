(function () {
	'use strict';

	const View = window.View;
	const UsersCollection = window.UsersCollection;
	const ScoreForm = window.ScoreForm;

	class ScoreView extends View {

		constructor() {
			super('js-score');
		}

		init() {
			this.scoreForm = new ScoreForm();
			this.scoreForm.renderTo(this.getElement());
		}
	}

	window.ScoreView = ScoreView;
})();
