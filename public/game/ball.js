(function () {
	'use strict';

	class Ball {
		constructor({x = 0, y = 0, vx = 0, vy = 0, r = 0, color = '#FF4500'}) {
			this.x = x;
			this.y = y;

			this.vx = vx;
			this.vy = vy;

			this.r = r;
			this.color = color;
		}

		draw(ctx) {
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
			ctx.fillStyle = this.color;
			ctx.fill();
			ctx.closePath();
		}

		dv({vx = 0, vy = 0}) {
			this.vx = vx;
			this.vy = vy;

		}

		dvx(vx = 0.1) {
			this.vx = vx;
		}

		dvy(vy = 0.1) {
			this.vy = vy;
			console.log(this.vy);
		}

		update(dt) {
			console.log(this.vx, this.vy);
			this.x += (this.vx * dt) | 0;
			this.y += (this.vy * dt) | 0;
		}

		checkRectBorder(rect, action) {
			let result = {
				x: false,
				y: false
			};

			if (this.x + this.r > rect.width || this.x - this.r < 0) {
				result.x = true;
			}

			if (this.y + this.r > rect.height || this.y - this.r < 0) {
				result.y = true;
			}

			this[action](result);
		}

		reflect(result) {
			if (result.x) {
				this.vx *= -1;
			}
			if (result.y) {
				this.vy *= -1;
			}
		}

		getCoordinates() {
			return {
				x: this.x,
				y: this.y,
				r: this.r
			}
		}


	}

	window.Ball = Ball;
}());

