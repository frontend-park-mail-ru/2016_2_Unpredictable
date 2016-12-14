'use strict';

export default class Ball {

	/**
	 * Конструктор класса Ball
	 */
	constructor({width, height}) {
		this.vx = 0;
		this.vy = 0;

		this.r = this.getRandom(5, 25);
		this.x = this.getRandom(0, width);
		this.y = this.getRandom(0, height);

		this.color = this.randomColor();
		console.log(this.color);
	}

	dv({vx = 0, vy = 0}) {
		this.vx += vx;
		this.vy += vy;
	}

	update(dt) {

		this.x += this.vx * dt;
		this.y += this.vy * dt;

		if (this.x < 0) {
			this.x = 10;
		}
		if (this.x > this.width) {
			this.x = this.width + 10;
		}

		if (this.y < 0) {
			this.y = 10;
		}
		if (this.y > this.height) {
			this.y = this.height + 10;
		}

	}

	checkRectangleIntersection({width, height}, action = 'relect') {
		const result = {};
		if (this.x + this.r > width || this.x - this.r < 0) {
			result.x = true;
		}

		if (this.y + this.r > height || this.y - this.r < 0) {
			result.y = true;
		}

		this[action](result);
	}

	checkBalls({balls}, action = 'relect') {
		const result = {};
		balls.forEach(ball => {
			if ((ball.x != this.x) && (ball.y != this.y)) {
				if (Math.sqrt(Math.pow((this.x - ball.x),2) + Math.pow((this.y - ball.y),2)) === this.r + ball.r){
					result.x = true;
				}
			}
			this[action](result);
		});
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


	getRandom(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}
	randomColor() {
		return '#' + Math.floor(Math.random() * 16777215).toString(16);
	}

}
