'use strict';

import THREELib from "three-js";
var THREE = THREELib();

export default class Camera {

	constructor({x = 0, y = 0, z = 0, rCam = 300}) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.rCam = rCam;
		this.changeX = -2;
		this.changeZ = -2;
		this.cameraPosition = 0;
		this.countnNewCircle();
	}

	countnNewCircle(){
		this.array = [];
		let count = 0;
		let angle;
		for (angle = 0; angle <= 0.11; angle += 0.0005) {
			let obj = {};
			obj.x = Math.cos(angle * 180 / Math.PI);
			obj.z = Math.sin(angle * 180 / Math.PI);
			this.array[count] = obj;
			++count;
		}
		this.maxCameraPosition = count;
	}

	setCamera(width, height) {
		this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 5000);
		this.camera.position.set(this.x, this.y, this.z);
		this.camera.rotation.x = 90 * Math.PI / 180;
	}

	getCamera() {
		return this.camera;
	}

	changePosition({x, y, z}) {
		this.camera.position.set(x, y, z);
	}

	getPosition() {
		return {
			x: this.x,
			y: this.y,
			z: this.z
		}
	}

	countCircle(d) {
		this.cameraPosition += d | 0;
		if(this.cameraPosition < 0){
			this.cameraPosition = this.maxCameraPosition + this.cameraPosition;
		}
		if (this.cameraPosition >= this.maxCameraPosition) {
			this.cameraPosition = this.cameraPosition - this.maxCameraPosition;
		}
		this.x = this.rCam * this.array[this.cameraPosition].x;
		this.z = this.rCam * this.array[this.cameraPosition].z;
	}

	increaseRCam(){
		this.rCam += 50;
	}

	decreaseRCam(){
		if(this.rCam === 300){
			this.rCam -= 50;
		}
	}
}
