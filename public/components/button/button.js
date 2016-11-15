'use strict';

import Block from '../block/block';

export default class Button extends Block {
	constructor(text, options) {
		super('button', options);
		this._el.innerText = text;
		this._el.classList.add('button');
	}
}
