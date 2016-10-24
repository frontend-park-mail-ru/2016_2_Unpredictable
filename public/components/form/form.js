(function () {
	'use strict';

	const Block = window.Block;

	class Form extends Block {
		constructor(options) {
			super('form', options);
			this._el.classList.add('form');
		}

	}
	window.Form = Form;

})();
