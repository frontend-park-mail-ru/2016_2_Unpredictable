'use strict';

export default class KeyMaster {
	constructor() {
		this.keys = {};

		this._onPress = this._keyHandler.bind(this, 'down');
		this._onUp = this._keyHandler.bind(this, 'up');
	}

	init() {
		document.addEventListener('keypress', this._onPress);
		document.addEventListener('keyup', this._onUp);
	}

	destroy() {
		document.removeEventListener('keypress', this._onPress);
		document.removeEventListener('keyup', this._onUp);
	}

	is(key) {
		// console.log(this.keys);
		return this.keys[key];
	}

	_keyHandler(action, event) {
		// console.log(action, event);
		let key = event.key;
		this.keys[key] = action === 'down';
	}
}

