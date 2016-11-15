'use strict';

import Block from '../block/block';

export default class Form extends Block {
	constructor(options) {
		super('form', options);
		this._el.classList.add('form');
	}

}
