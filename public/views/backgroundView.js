'use strict';

import View from '../modules/view';
import Background from '../components/background/background';

export default class backgroundView extends View {
	constructor(options = {}) {
		super('js-background');
	}

	init(options = {}) {
	}

	_initCanvas() {
		this.canvas = this._el.querySelector('.js-canvas-new');
		this.canvas.width = this._el.clientWidth;
		this.canvas.height = this._el.clientHeight;
	}

	resume() {
		this._initCanvas();
		this.canvas.hidden = false;

		this._background = new Background({
			ctx: this.canvas.getContext('2d'),
			width: this.canvas.width,
			height: this.canvas.height
		});

		this._background.start();

		window.addEventListener('resize', function () {
			console.log(this._el.clientWidth, this._el.clientHeight);
			this.canvas.width = this._el.clientWidth;
			this.canvas.height = this._el.clientHeight;
			this._background.setSize(this._el.clientWidth, this._el.clientHeight);
		}.bind(this));
	}

	pause() {
		this._background.stop();
		this.canvas.hidden = true;
	}
}
