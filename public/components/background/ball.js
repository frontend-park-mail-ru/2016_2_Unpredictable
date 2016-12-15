'use strict';

export default class Ball {

	/**
	 * Конструктор класса Ball
	 */
	constructor({width, height}) {
		this.vx = 0;
		this.vy = 0;

		this.r = this.getRandom(5, 25) | 0;
		this.x = this.getRandom(0, width) | 0;
		this.y = this.getRandom(0, height) | 0;

		this.color = this.randomColor();
	}

	dv({vx = 0, vy = 0}) {
		this.vx += vx;
		this.vy += vy;
	}

	update(dt) {

		this.x += this.vx * dt;
		this.y += this.vy * dt;

		if (this.x < 0) {
			this.x = this.r;
		}
		if (this.x > this.width) {
			this.x = this.width - this.r;
		}

		if (this.y < 0) {
			this.y = this.r;
		}
		if (this.y > this.height) {
			this.y = this.height - this.r;
		}

	}

	checkRectangleIntersection({width, height}, action = 'reflect') {
		const result = {};
		if (this.x + this.r > width || this.x - this.r < 0) {
			result.x = true;
		}

		if (this.y + this.r > height || this.y - this.r < 0) {
			result.y = true;
		}

		this[action](result);
	}

	destroy(axis) {
		if (axis.x || axis.y) {
			this.toDestroy = true;
		}
	}

	reflect(axis) {
		Object.keys(axis).forEach(dem => {
			if (axis[dem]) {
				this[`v${dem}`] *= -1;
			}
		});
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}

	getInfo(){
		return {
			x: this.x,
			y: this.y,
			r: this.r
		}
	}


	getRandom(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}
	randomColor() {
		return '#' + Math.floor(Math.random() * 16777215).toString(16);
	}

}
