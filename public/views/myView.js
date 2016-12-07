'use strict';

import View from '../modules/view';
import Background from '../components/background/background';

export default class MyView extends View {
	constructor(options = {}) {
		super('js-background');
	}

	init(options = {}) {}

	_initCanvas () {
		this.canvas = this._el.querySelector('.js-canvas-new');
		this.canvas.width = this._el.clientWidth + '';
		this.canvas.height = this._el.clientHeight + '';
	}

	resume () {
		super.resume();
		this._initCanvas();

		this._background = new Background({
			ctx: this.canvas.getContext('2d'),
			width: +this.canvas.width,
			height: +this.canvas.height
		});

		this._background.start();
	}
}