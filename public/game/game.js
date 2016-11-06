(function () {
	'use strict';

	const Ball = window.Ball;
	const KeyMaster = window.KeyMaster;

	class Game {
		constructor(params) {
			this.ctx = params.ctx;
			this.width = params.width;
			this.height = params.height;

			this.key = new KeyMaster();
			this.key.init();

			this.ball1 = new Ball({x: 100, y: 100, r: 30});
			this.ball2 = new Ball({x: 200, y: 200, r: 40});
			this.ball3 = new Ball({x: 400, y: 500, r: 20});

			this.balls = {
				ball1: this.ball1,
				ball2: this.ball2,
				ball3: this.ball3
			}
		}

		start() {
			for (let ball in this.balls) {
				this.balls[ball].draw(this.ctx);
			}
			this.balls.ball1.dv({vx: 0, vy: 0});
			this.balls.ball2.dv({vx: 0.1, vy: -0.1});
			this.balls.ball3.dv({vx: -0.1, vy: -0.1});
			this.animate();
		}

		animate() {
			let date = Date.now();
			let doAnimate = () => {
				let localDate = Date.now();
				this.clear();

				for (let ball in this.balls) {
					this.balls[ball].update(localDate - date);
					this.balls[ball].draw(this.ctx);
					this.balls[ball].checkRectBorder({
						width: this.width,
						height: this.height
					}, 'reflect');
				}
				this.checkRectEach();
				this.doKeys();
				date = localDate;

				requestAnimationFrame(doAnimate);
			};

			doAnimate()
		}

		checkRectEach() {
			let checked = [];
			for (let currentBall in this.balls) {
				let current = this.balls[currentBall];
				for (let ball in this.balls) {
					if (ball !== currentBall) {
						let each = this.balls[ball];
						let distancexy = (Math.sqrt((current.x - each.x) * (current.x - each.x) +
								(current.y - each.y) * (current.y - each.y))) | 0;
						let distancer = current.r + each.r;
						if (distancer > distancexy) {
							let already = false;
							checked.forEach(function (balls, i, checked) {
								if (balls === '' + ball + currentBall || balls === '' + currentBall + ball) {
									already = true;
								}
							});
							if (!already) {
								this.balls[currentBall].reflect({x: true, y: true});
								this.balls[ball].reflect({x: true, y: true});
								checked.push('' + ball + currentBall);
							}
						}
					}
				}
			}
		};

		doKeys() {
			if (this.key.is('w')) {
				this.ball1.dvy(-0.1);
			}
			if (this.key.is('s')) {
				this.ball1.dvy(0.1);
			}
			if (this.key.is('a')) {
				this.ball1.dvx(-0.1);
			}
			if (this.key.is('d')) {
				this.ball1.dvx(0.1);
			}
		}

		clear() {
			this.ctx.clearRect(0, 0, this.width, this.height);
		}


	}

	window.Game = Game;
}());

