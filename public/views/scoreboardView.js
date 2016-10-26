(function () {
	'use strict';

	const View = window.View;
	const UsersCollection = window.UsersCollection;
	const fest = window.fest['templates/scoreboard'];

	class ScoreView extends View {

		constructor() {
			super('js-score');
		}

		init() {
			this._users = new UsersCollection();
			this._users.sort();
		}

		resume() {
			this._el.innerHTML = fest({items:this._users.getData()});
			this.show();
		}
	}

	window.ScoreView = ScoreView;
})();


