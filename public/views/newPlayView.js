(function () {
	'use strict';

	const View = window.View;
	const DGame = window.DGame;

	class PlayView extends View {

		constructor() {
			super('js-play');
			this.game = new DGame();
		}


		init(options = {}) {
			this.game.init(this.getElement());
			this.user = options;
		}
		resume(options = {}){
			this.show();
		}

		show(){
			this.getElement().hidden = false;
			console.log(this.getElement());
		}
	}

	window.NewPlayView = PlayView;
})();
