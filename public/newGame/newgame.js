'use strict';

import THREELib from "three-js";
import Ball from "./ball";
import Camera from "./camera";
import KeyMaster from "./keymaster";
import Light from "./light";
import Socket from "../models/socketModel";
var THREE = THREELib(); // return THREE JS

export default class DGame {
	constructor() {
		this.width = 1200;
		this.height = 600;

		/*this.socket = new Socket();
		 this.key
		 this.socket.init(this.key);
		 */
		this.players = [];
		this.dots = [];
		this.oldPosition = 0;

		this.key = new KeyMaster();
		this.key.init();

		this.rendrer = new THREE.WebGLRenderer({antialias: true});
		this.rendrer.setSize(this.width, this.height);

		this.lockChangeAlert = this.lockChangeAlert.bind(this);
	}

	lockChangeAlert() {
		console.log(document.pointerLockElement);
		if (document.pointerLockElement === this.canvas ||
			document.mozPointerLockElement === this.canvas) {
			console.log('The pointer lock status is now locked');
			this.updatePosition = this.updatePosition.bind(this);
			document.addEventListener("mousemove", this.updatePosition, false);
		} else {
			document.removeEventListener("mousemove", this.updatePosition, false);
		}
	}

	updatePosition(mousePosition) {
		let coordinates = this.camera.getPosition();
		let d = mousePosition.movementX - this.oldPosition;
		console.log(coordinates);
		console.log(d);
		let cameraCoordinates = {
			x: coordinates.x + d,
			z: coordinates.z
		};
		let ballCoordinates = this.dots[3].getPosition();
		this.oldPosition = mousePosition.movementX;
		this.camera.countCircle(ballCoordinates, cameraCoordinates);
	}

	init(element) {
		element.appendChild(this.rendrer.domElement);

		this.camera = new Camera({x: 0, y: 200, z: 300});
		this.camera.setCamera(this.width, this.height);

		this.canvas = this.rendrer.domElement;
		this.canvas.requestPointerLock = this.canvas.requestPointerLock || this.canvas.mozRequestPointerLock;
		document.exitPointerLock = document.exitPointerLock || document.mozRequestPointerLock;
		this.canvas.onclick = () => {
			this.canvas.requestPointerLock();
		};
		document.addEventListener('pointerlockchange', this.lockChangeAlert, false);
		document.addEventListener('mozpointerlockchange', this.lockChangeAlert, false);

		this.scene = new THREE.Scene();

		this.players = [];
		this.dots = [];
		let sphere = new Ball({x: 100, y: 0, z: 100, r: 40, color: 'blue'});
		sphere.setCamera(this.camera.getCamera());
		sphere.draw(this.scene);

		let randsphere = new Ball({x: 50, y: 0, z: 100, r: 50, color: 'red'});
		randsphere.draw(this.scene);
		this.dots.push(randsphere);
		let randsphere1 = new Ball({x: 150, y: 0, z: 10, r: 10, color: 'red'});
		randsphere1.draw(this.scene);
		this.dots.push(randsphere1);
		let randsphere2 = new Ball({x: 300, y: 0, z: 150, r: 70, color: 'red'});
		randsphere2.draw(this.scene);
		this.dots.push(randsphere2);
		this.dots.push(sphere);

		this.light = new Light({x: 0, y: 150, z: 100});
		this.light.setLight(this.scene);

		this.rendrer.setClearColor('grey');
	}

	// cicle() {
	// 	let array = [];
	// 	let count = 0;
	// 	let angle = 0;
	// 	for (angle = 0; angle <= 0.1; angle += 0.001) {
	// 		let obj = {};
	// 		obj.x = 150 * Math.cos(angle * 180 / Math.PI);
	// 		obj.z = 150 * Math.sin(angle * 180 / Math.PI);
	// 		console.log(obj);
	// 		array[count] = obj;
	// 		++count;
	// 	}
	// 	let pred = count;
	// 	count = 0;
	// 	let doAnimate = () => {
	// 		if (count === pred) {
	// 			count = 0;
	// 		}
	// 		this.camera.position.y = array[count].x;
	// 		this.camera.position.z = array[count].z;
	// 		++count;
	// 		console.log(this.camera.position);
	// 		this.light.lookAt(this.floormesh.position);
	// 		this.renderer();
	// 		requestAnimationFrame(doAnimate);
	// 	};
	// 	doAnimate();
	// }

	animate() {
		let date = Date.now();
		let doAnimate = () => {
			let localdate = Date.now();
			// console.log(this.dots[3].r);
			// let r = this.dots[3].r -  1;
			// console.log(r);
			// this.dots[3].removeFromScene(this.scene);
			// this.dots[3] = new Ball({x: 75, y: 0, z: 75, r: r, color: 'blue'});
			// this.dots[3].setCamera(this.camera.getCamera());
			// this.dots[3].draw(this.scene);
			this.doKeys();
			this.dots[3].decreaseAll();
			this.dots[3].update(localdate - date);
			console.log(this.camera.getPosition());
			this.dots[3].setCamera(this.camera.getCamera());
			this.renderer();
			date = localdate;
			requestAnimationFrame(doAnimate);
		};
		doAnimate();
	}

	doKeys() {
		if (this.key.is('w') || this.key.is('ц')) {
			this.dots[3].dvzDecrease();
		}
		if (this.key.is('s') || this.key.is('ы')) {
			this.dots[3].dvzIncrease();
		}
		if (this.key.is('a') || this.key.is('ф')) {
			this.dots[3].dvxDecrease();
		}
		if (this.key.is('d') || this.key.is('в')) {
			this.dots[3].dvxIncrease();
		}
		let coordinates = this.dots[3].getPosition();
		//this.camera.changePosition({x: coordinates.x, y: coordinates.y + 100, z:coordinates.z + 200 });
		this.light.changePosition({x: coordinates.x, y: coordinates.y + 200, z: coordinates.z + 200});
	}

	checkR() {
		let i;
		for (i = 0; i < this.dots.length; ++i) {

		}
	}

	renderer() {
		this.rendrer.render(this.scene, this.camera.getCamera());
	}

}

