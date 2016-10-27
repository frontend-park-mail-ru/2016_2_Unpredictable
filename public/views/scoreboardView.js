(function () {
	'use strict';

	const View = window.View;
	const UsersCollection = window.UsersCollection;
	const ScoreTable = window.ScoreTable;
	const fest = window.fest['templates/scoreboard'];
	const Button = window.Button;

	class ScoreView extends View {

		constructor() {
			super('js-score');
		}

		init(model = {}) {
			//this._users = new UsersCollection();
			//this._users.sort();
			this.user = model.user;
			this.board = new ScoreTable ();
		}

		resume() {
			this._el.innerHTML = fest({items:this._users.getData()});
			this.button = new Button ('Назад', {});
			this.onBack();
			this._el.appendChild(this.button);
			this.show();
		}

		onBack(callback){
			this.button.on('click', function (button){
				button.preventDefault();
				callback();
			});
		}

		showMainApp(){
			this.pause();
			this.router.go('/', this.user);
		}
	}

	window.ScoreView = ScoreView;
})();


