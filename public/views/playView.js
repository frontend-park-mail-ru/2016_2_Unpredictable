(function () {
	'use strict';

	const View = window.View;

	class PlayView extends View {

		constructor() {
			super('js-play');
		}

		init() {
			this._el.innerHTML = '<img src=http://naklejka.ru/image/cache/data/naklejki/stickerbombing/stiker-s-kotom-persik-450x450.png>';
		}
	}

	window.PlayView = PlayView;
})();
