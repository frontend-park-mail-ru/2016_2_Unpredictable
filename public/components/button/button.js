(function () {
	'use strict';

	const Block = window.Block;

	class Button extends Block{
		constructor(text,options){
			super('button', options);
			this._el.innerText = text;
			this._el.classList.add('button');
		}
	}

	window.Button = Button;

})();
