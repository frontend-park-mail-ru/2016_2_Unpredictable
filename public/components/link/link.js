(function () {
	'use strict';

	const Block = window.Block;

	class Link extends Block {
		constructor(text, options) {
			super('a', options);
			this._el.innerText = text;
			this._el.classList.add('link');
		}
	}

	window.Link = Link;

})();
