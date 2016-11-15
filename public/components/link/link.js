'use strict';

import Block from '../block/block';

export default class Link extends Block {
	constructor(text, options) {
		super('a', options);
		this._el.innerText = text;
		this._el.classList.add('link');
	}
}

