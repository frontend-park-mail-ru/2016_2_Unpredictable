'use strict';

import THREELib from "three-js";
var THREE = THREELib(); // return THREE JS

export default class Ball {

	constructor({x = 0, y = 0, z = 0, vx = 0, vy = 0, vz = 0, r = 0, color = 'green'}) {
		this.x = x;
		this.y = y;
		this.z = z;

		this.vx = vx;
		this.vy = vy;
		this.vz = vz;

		this.r = r;
		this.newR = r;
		this.canChangeR = true;
		this.dr = 30;
		this.color = color;
	}

	draw(scene) {
		this.object = new THREE.SphereGeometry(this.newR | 0, 26, 26);
		this.material = new THREE.MeshPhongMaterial({color: this.color, transparent: true});
		this.objectmesh = new THREE.Mesh(this.object, this.material);
		this.objectmesh.position.set(this.x, this.y, this.z);
		scene.add(this.objectmesh);
	}

	getR() {
		return {
			r: this.newR
		};
	}

	getPosition() {
		return {
			x: this.x,
			y: this.y,
			z: this.z
		}
	}

	setCamera(camera) {
		camera.lookAt(new THREE.Vector3(this.x, this.y, this.z));
	}

	update(dt) {
		this.x += (this.vx / 100 * dt) | 0;
		this.z += (this.vz / 100 * dt) | 0;
		this.objectmesh.position.set(this.x, this.y, this.z);
		//console.log({x: this.x, y: this.y, z: this.z});
	}

	changeSpeed(Sin, Cos) {
		this.vx = -1 * ((100 * Sin) | 0);
		this.vz = -1 * ((100 * Cos) | 0);
	}

	moveForward(Sin, Cos) {
		this.vx = -1 * ((40 * Sin) | 0);
		this.vz = -1 * ((40 * Cos) | 0);
	}

	moveBackward(Sin, Cos) {
		this.vx = (40 * Sin) | 0;
		this.vz = (40 * Cos) | 0;
	}

	moveLeft(Sin, Cos) {
		this.vx = -1 * ((40 * Cos) | 0);
		this.vz = (40 * Sin) | 0;
	}

	moveRight(Sin, Cos) {
		this.vx = (40 * Cos) | 0;
		this.vz = -1 * ((40 * Sin) | 0);
	}

	decreaseAll() {
		if (this.vz !== 0) {
			if (0 < this.vz && this.vz <= 100) {
				this.vz -= 1;
			} else if (0 > this.vz && this.vz >= -100) {
				this.vz += 1;
			}
		}
		if (this.vx !== 0) {
			if (0 < this.vx && this.vx <= 100) {
				this.vx -= 1;
			} else if (0 > this.vx && this.vx >= -100) {
				this.vx += 1;
			}
		}
	}

	increaseR(scene) {
		if (this.canChangeR) {
			this.canChangeR = false;
			this.newR = this.r + this.dr;
			scene.remove(this.objectmesh);
			this.draw(scene);
			setTimeout(() => {
				this.canChangeR = true;
			}, 20000)
		}
	}

	decreaseR(scene) {
		if (this.r < this.newR) {
			this.newR -= 0.25;
			scene.remove(this.objectmesh);
			this.draw(scene);
		}
	}

	redraw(scene, green) {
		scene.remove(this.objectmesh);
		this.color = green;
		this.draw(scene);
	}

	removeFromScene(scene) {
		scene.remove(this.objectmesh);
	}

	getColor() {
		return this.color;
	}

	getSpeed() {
		return {
			vx: this.vx,
			vz: this.vz
		}
	}

	checkReact(action) {
		const result = {
			x: false,
			z: false
		};

		if (this.x + this.newR >= 1000) {
			this.x = (1000 - this.newR) | 0;
			result.x = true;
		} else if (this.x - this.newR <= -1000) {
			this.x = (this.newR - 1000) |0;
			result.x = true;
		}

		if (this.z + this.newR >= 1000) {
			this.z = (1000 - this.newR) | 0;
			result.z = true;
		} else if (this.z - this.newR <= -1000) {
			this.z = (this.newR - 1000) | 0;
			result.z = true;
		}
		this[action](result);
	}

	reflect(result) {
		if (result.x) {
			this.vx *= -1;
		}
		if (result.z) {
			this.vz *= -1;
		}
	}


}
