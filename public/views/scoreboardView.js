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
			this._user = new UsersCollection();
			//this._users.sort();
			this.user = model.user;
			//this.board = new ScoreTable();
		}

		resume() {
			this._el.innerHTML = fest({items:this._user.getData()});
			this.button = new Button ('Назад', {});
			this.button.on('click', this.showApp.bind(this));
			console.log(this.user);
			this.getElement().appendChild(this.button._get());
			this.show();
		}

		onBack(callback){
			this.button.on('click', function (button){
				button.preventDefault();
				callback();
			});
		}

		showApp(){
			this.pause();
			this._el = {};
			this.router.go('/app', this.user);
		}
	}

	window.ScoreView = ScoreView;
})();


