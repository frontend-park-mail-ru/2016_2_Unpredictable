'use strict';

import Block from '../block/block';
import './input.scss'
console.log('kjdjkjslf');


export default class Input extends Block {
	constructor(options) {
		super('input', options);
		this._el.classList.add('input');
	}

	getValue() {
		return this._el.value;
	}
}

