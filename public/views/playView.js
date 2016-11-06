(function () {
	'use strict';

	const View = window.View;

	class PlayView extends View {

		constructor() {
			super('js-play');
		}

		init() {
			this.canvas = this.getElement().querySelector('js-canvas');
			this.canvas.width = '1024';
			this.canvas.height = '768';
			this.ctx =  this.canvas.getContext('2d');

			//this._el.innerHTML = "<img src=http://naklejka.ru/image/cache/data/naklejki/stickerbombing/stiker-s-kotom-persik-450x450.png>";
		}
	}

	window.PlayView = PlayView;
})();
