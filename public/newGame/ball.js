'use strict';

import THREELib from "three-js";
var THREE = THREELib(); // return THREE JS

export default class Ball {

	constructor({x = 0, y = 0, z = 0, vx = 0, vy = 0, vz = 0, r = 0, color = '#FF4500'}) {
		this.x = x;
		this.y = y;
		this.z = z;

		this.vx = vx;
		this.vy = vy;
		this.vz = vz;

		this.r = r;
		this.newR = r;
		this.canChangeR = true;
		this.dr = 20;
		this.color = color;
	}

	draw(scene) {
		this.object = new THREE.SphereGeometry(this.newR | 0, 32, 32);
		this.material = new THREE.MeshPhongMaterial({color: this.color, transparent: true});
		this.objectmesh = new THREE.Mesh(this.object, this.material);
		this.objectmesh.position.set(this.x, this.y, this.z);
		scene.add(this.objectmesh);
	}

	changeOpacity(){
		this.material.opacity = 0.5;
	}

	getR(){
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

	changeSpeed(Sin, Cos){
		this.vx = -1 * ((80 * Sin) | 0);
		this.vz = -1 * ((80 * Cos) | 0);
	}

	dvzIncrease(Cos) {
		if (this.vz <= 100) {
			this.vz += (10 * Cos) | 0;
		}
	}

	dvzDecrease(Cos) {
		if (this.vz >= -100) {
			this.vz -= (10 * Cos) | 0;
		}
	}

	dvxIncrease(Sin) {
		if (this.vx <= 100) {
			this.vx += (10 * Sin) | 0;
		}
	}

	dvxDecrease(Sin) {
		if (this.vx >= -100) {
			this.vx += (10 * Sin) | 0;
		}
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

	increaseR(scene){
		if(this.canChangeR) {
			this.canChangeR = false;
			this.newR = this.r + this.dr;
			scene.remove(this.objectmesh);
			this.draw(scene);
			setTimeout(() => {
				this.canChangeR = true;
			}, 5000)
		}
	}

	decreaseR(scene){
		if(this.r < this.newR) {
			this.newR -= 0.5;
			scene.remove(this.objectmesh);
			this.draw(scene);
		}
	}

	redraw(scene, green){
		scene.remove(this.objectmesh);
		this.color = green;
		this.draw(scene);
	}

	getColor(){
		return this.color;
	}


}


