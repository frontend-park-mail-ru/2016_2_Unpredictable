(function () {
	'use strict';

	const View = window.View;
	const Game = window.Game;

	class PlayView extends View {

		constructor() {
			super('js-play');
		}

		init(options = {}) {
			this.canvas = this.getElement().querySelector('.js-canvas');
			this.canvas.width = '1024';
			this.canvas.height = '512';
			this.ctx =  this.canvas.getContext('2d');

			//this._el.innerHTML = "<img src=http://naklejka.ru/image/cache/data/naklejki/stickerbombing/stiker-s-kotom-persik-450x450.png>";
		}

		resume(options = {}){
			this._game = new Game({
				height: 512,
				width: 1024,
				ctx: this.ctx
			});
			this._game.start();
			this.show();
		}

		show(){
			this.getElement().hidden = false;
		}
	}

	window.PlayView = PlayView;
})();
