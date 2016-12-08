'use strict';

import THREELib from "three-js";
import Ball from "./ball";
import Camera from "./camera";
import KeyMaster from "./keymaster";
import Light from "./light";
import pointerLock from "./pointerLock"
let THREE = THREELib(); // return THREE JS

export default class DGame {
	constructor() {
		this.width = 1200;
		this.height = 800;

		this.key = new KeyMaster();

		this.dots = [];

		this.key.init();

		this.rendrer = new THREE.WebGLRenderer({antialias: true});
		this.rendrer.setSize(this.width, this.height);
	}


	init(element) {
		element.appendChild(this.rendrer.domElement);

		this.camera = new Camera({x: 0, y: 100, z: 300});
		this.camera.setCamera(this.width, this.height);

		this.pointerLock = new pointerLock(this.rendrer, this.camera);

		this.scene = new THREE.Scene();

		this.dots = [];
		this.r = 40;
		this.player = new Ball({x: 100, y: 0, z: 100, r: this.r, color: 'blue'});
		this.player.setCamera(this.camera.getCamera());
		this.player.draw(this.scene);

		let randsphere = new Ball({x: 50, y: 0, z: 100, vx: 70, vz: 40, r: 50, color: 'red'});
		randsphere.draw(this.scene);
		this.dots.push(randsphere);
		let randsphere1 = new Ball({x: 150, y: 0, z: 10, r: 10, vx: 90, vz: -30, color: 'green'});
		randsphere1.draw(this.scene);
		this.dots.push(randsphere1);
		let randsphere2 = new Ball({x: 300, y: 0, z: 150, vx: -30, vz: -90, r: 70, color: 'red'});
		randsphere2.draw(this.scene);
		this.dots.push(randsphere2);
		let randsphere3 = new Ball({x: -300, y: 0, z: 150, vx: -50, vz: -40, r: 35, color: 'green'});
		randsphere3.draw(this.scene);
		this.dots.push(randsphere3);
		let randsphere4 = new Ball({x: 300, y: 0, z: -150, vx: -90, vz: -30, r: 25, color: 'red'});
		randsphere4.draw(this.scene);
		this.dots.push(randsphere4);
		let randsphere5 = new Ball({x: 300, y: 0, z: -150, vx: -90, vz: 30, r: 55, color: 'red'});
		randsphere5.draw(this.scene);
		this.dots.push(randsphere5);
		let randsphere6 = new Ball({x: 300, y: 0, z: -150, vx: 90, vz: -30, r: 60, color: 'red'});
		randsphere6.draw(this.scene);
		this.dots.push(randsphere6);
		let randsphere7 = new Ball({x: 300, y: 0, z: -150, vx: 50, vz: -30, r: 15, color: 'green'});
		randsphere7.draw(this.scene);
		this.dots.push(randsphere7);


		this.grid = new THREE.GridHelper(1000, 50, 'grey', 'grey');
		this.scene.add(this.grid);
		this.grid.position.set(0, 0, 0);

		this.Sin = 0;
		this.Cos = 0;

		this.light = new Light({x: 0, y: 150, z: 100});
		this.light.setLight(this.scene);

		let calcSpeed = this.calcSpeed.bind(this);
		document.addEventListener('mouseup', calcSpeed, false);
		this.rendrer.setClearColor('#F5F5F5');
	}

	animate() {
		let date = Date.now();
		let doAnimate = () => {
			let localdate = Date.now();
			this.doKeys();
			for (let j = 0; j < this.dots.length; ++j) {
				this.dots[j].update(localdate - date);
				this.dots[j].checkReact('reflect');
				let checkDotR = this.dots[j].getR();
				let checkDotCoor = this.dots[j].getPosition();
				this.checkReactEach({j: j, checkDotCoor: checkDotCoor, checkDotR: checkDotR});
			}
			this.player.update(localdate - date);
			this.player.checkReact('reflect');
			// this.playerCoor = this.player.getPosition();
			// this.playerR = this.player.getR();
			// this.checkReactEach({j: 0, checkDotCoor: this.playerCoor, checkDotR: this.playerR});
			this.player.decreaseAll();
			this.player.setCamera(this.camera.getCamera());
			this.player.decreaseR(this.scene);
			this.checkR();
			this.renderer();
			date = localdate;
			requestAnimationFrame(doAnimate);
		};
		doAnimate();
	}

	calcSpeed(event) {
		this.calcSinCos();
		this.player.removeFromScene(this.scene);
		let coor = this.player.getPosition();
		let food = new Ball({x: coor.x, z: coor.z, r: 7, color: 'green'});
		food.draw(this.scene);
		food.changeSpeed(-this.Sin, -this.Cos);
		this.dots.push(food);
		this.r -= 3;
		this.player = new Ball({x: coor.x, z: coor.z, r: this.r, color: 'blue'});
		this.player.draw(this.scene);
		this.player.changeSpeed(this.Sin, this.Cos);
	}

	calcSinCos() {
		let coordinates = this.camera.getPosition();
		let sum = Math.sqrt(coordinates.z ** 2 + coordinates.x ** 2);
		this.Sin = coordinates.x / sum;
		this.Cos = coordinates.z / sum;
	}

	doKeys() {
		if (this.key.is('w') || this.key.is('ц')) {
			this.calcSinCos();
			this.player.moveForward(this.Sin, this.Cos);
		}
		if (this.key.is('s') || this.key.is('ы')) {
			this.calcSinCos();
			this.player.moveBackward(this.Sin, this.Cos);
		}
		if (this.key.is('a') || this.key.is('ф')) {
			this.calcSinCos();
			this.player.moveLeft(this.Sin, this.Cos);
		}
		if (this.key.is('d') || this.key.is('в')) {
			this.calcSinCos();
			this.player.moveRight(this.Sin, this.Cos);
		}
		if (this.key.is(' ')) {
			this.player.increaseR(this.scene);
		}
		let coordinates = this.camera.getPosition();
		let ballCoordinates = this.player.getPosition();
		let newCoor = {
			x: coordinates.x + ballCoordinates.x,
			y: coordinates.y + ballCoordinates.y,
			z: coordinates.z + ballCoordinates.z
		};
		this.camera.changePosition(newCoor);
		this.light.changePosition(newCoor);

	}

	checkR() {
		let check = this.dots[1].getR().r;
		for (let i = 2; i < this.dots.length; ++i) {
			let checkColor = this.dots[i].getColor();
			if (this.dots[i].getR().r < check && checkColor === 'red') {
				this.dots[i].redraw(this.scene, 'green');
			} else if (this.dots[i].getR().r > check && checkColor === 'green') {
				this.dots[i].redraw(this.scene, 'red');
			}
		}
	}

	checkReactEach({j, checkDotCoor, checkDotR}) {
		for (let k = j + 1; k < this.dots.length; ++k) {
			let newCheckDotR = this.dots[k].getR().r;
			let newCheckDotCoor = this.dots[k].getPosition();
			let Distance = Math.sqrt((checkDotCoor.x - newCheckDotCoor.x) ** 2 + (checkDotCoor.z - newCheckDotCoor.z) ** 2);
			let distR = newCheckDotR + checkDotR.r;
			if (Distance < distR) {
				this.dots[k].removeFromScene(this.scene);
				this.dots[j].removeFromScene(this.scene);
				let speed = this.dots[j].getSpeed();
				let speed1 = this.dots[k].getSpeed();
				if (newCheckDotR > checkDotR) {
					this.dots[j] = new Ball({
						x: checkDotCoor.x, z: checkDotCoor.z, vx: speed.vx, vz: speed.vz,
						r: checkDotR.r - 0.4
					});
					this.dots[k] = new Ball({
						x: newCheckDotCoor.x, z: newCheckDotCoor.z, vx: speed1.vx, vz: speed1.vz,
						r: newCheckDotR + 0.4
					});
				} else {
					this.dots[j] = new Ball({
						x: checkDotCoor.x, z: checkDotCoor.z, vx: speed.vx, vz: speed.vz,
						r: checkDotR.r + 0.4
					});
					this.dots[k] = new Ball({
						x: newCheckDotCoor.x, z: newCheckDotCoor.z, vx: speed1.vx, vz: speed1.vz,
						r: newCheckDotR - 0.4
					});
				}
				this.dots[j].draw(this.scene);
				this.dots[k].draw(this.scene);
			}
		}
	}

	renderer() {
		this.rendrer.render(this.scene, this.camera.getCamera());
	}

}

