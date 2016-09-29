(function () {
	'use strict';

	const Block = window.Block;

	class Input extends Block {
		constructor(options) {
			super('input', options);
		}

		getValue() {
			return this._el.value;
		}

	}

	window.Input = Input;

})();
