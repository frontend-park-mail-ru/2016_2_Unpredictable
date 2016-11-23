'use strict';

import THREELib from "three-js";
var THREE = THREELib(); // return THREE JS

export default class Camera {

	constructor({x = 0, y = 0, z = 0, rCam = 50}) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.rCam = rCam;
		this.changeX = 1;
		this.changeZ = 1;
	}

	setCamera(width, height) {
		this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
		this.camera.position.set(this.x, this.y, this.z);
		this.camera.rotation.x = 90 * Math.PI / 180;
	}

	getCamera() {
		return this.camera;
	}

	changePosition({x, y, z}) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.camera.position.set(this.x, this.y, this.z);
	}

	getPosition() {
		return {
			x: this.x,
			y: this.y,
			z: this.z
		}
	}

	countCircle(ballPosition, newCameraPosition) {
		let vectorA = {
			x: this.x - ballPosition.x,
			z: this.z - ballPosition.z
		};
		let vectorB = {
			x: newCameraPosition.x - ballPosition.x,
			z: newCameraPosition.z - ballPosition.z
		};
		let Cos = (vectorA.x * vectorB.x + vectorA.z * vectorB.z) / (Math.sqrt(vectorA.x ** 2 + vectorA.z ** 2)
			* Math.sqrt(vectorB.x ** 2 + vectorB.z ** 2));
		let Sin = Math.sqrt(1 - Cos ** 2);
		switch (this.changeX) {
			case 1:
				if(this.x > 50) {
					this.changeX = 2;
					this.x = 50;
					break;
				}
				this.x += (this.x - Cos * this.rCam) | 0;
				break;
			case 2:
				if(this.x < -50) {
					this.changeX = 1;
					this.x = -50;
					break;
				}
				this.x -= (this.x - Cos * this.rCam) | 0;
				break;
		}
		switch (this.changeZ) {
			case 1:
				if (this.z > 50) {
					this.changeZ = 2;
					this.z = 50;
					break;
				}
				this.z += (this.z - Sin * this.rCam) | 0;
				break;
			case 2:
				if (this.z < -50) {
					this.changeZ = 1;
					this.z = -50;
					break;
				}
				this.z -= (this.z - Sin * this.rCam) | 0;
				break;
		}
		this.camera.position.set(this.x, this.y, this.z);
	}
}
