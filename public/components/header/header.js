(function () {
	'use strict';

	const Block = window.Block;

	class Header extends Block{
		constructor (text, size, options) {
			super('h' + size, options);
			this._el.innerText = text;
		}

	}

	//export
	window.Header = Header;

})();
