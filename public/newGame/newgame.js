'use strict';

import THREELib from "three-js";
import Ball from "./ball";
import Camera from "./camera";
import KeyMaster from "./keymaster";
import Light from "./light";
var THREE = THREELib(); // return THREE JS

export default class DGame {
	constructor() {
		this.width = 1200;
		this.height = 600;

		this.key = new KeyMaster();
		this.key.init();

		this.rendrer = new THREE.WebGLRenderer({antialias: true});
		this.rendrer.setSize(this.width, this.height);
	}

	init(element) {
		element.appendChild(this.rendrer.domElement);
		this.scene = new THREE.Scene();

		this.camera = new Camera({x: 0, y: 100, z: 200});
		this.camera.setCamera(this.width, this.height);

		this.sphere = new Ball({x: 100, y: 0, z: 100, r: 40, color: 'blue'});
		this.sphere.draw(this.scene);
		this.sphere.setCamera(this.camera.getCamera());
		this.randsphere = new Ball({x: 100, y: 0, z: 100, r: 50, color: 'red'});
		this.randsphere.draw(this.scene);
		this.randsphere1 = new Ball({x: 150, y: 0, z: 10, r: 10, color: 'red'});
		this.randsphere1.draw(this.scene);
		this.randsphere2 = new Ball({x: 300, y: 0, z: 150, r: 70, color: 'red'});
		this.randsphere2.draw(this.scene);

		this.light = new Light({x : 0, y : 150, z : 100});
		this.light.setLight(this.scene);

		this.rendrer.setClearColor('grey');
	}

	cicle() {
		let array = [];
		let count = 0;
		let angle = 0;
		for (angle = 0; angle <= 0.1; angle += 0.001) {
			let obj = {};
			obj.x = 150 * Math.cos(angle * 180 / Math.PI);
			obj.z = 150 * Math.sin(angle * 180 / Math.PI);
			console.log(obj);
			array[count] = obj;
			++count;
		}
		let pred = count;
		count = 0;
		let doAnimate = () => {
			if (count === pred) {
				count = 0;
			}
			this.camera.position.y = array[count].x;
			this.camera.position.z = array[count].z;
			++count;
			console.log(this.camera.position);
			this.light.lookAt(this.floormesh.position);
			this.renderer();
			requestAnimationFrame(doAnimate);
		};
		doAnimate();
	}

	animate(){
		let date = Date.now();
		let doAnimate = () => {
			let localdate = Date.now();
			this.doKeys();
			this.sphere.decreaseAll();
			this.sphere.update(localdate - date);
			this.sphere.setCamera(this.camera.getCamera());
			this.renderer();
			date = localdate;
			requestAnimationFrame(doAnimate);
		};
		doAnimate();
	}

	doKeys() {
		if (this.key.is('w')) {
			this.sphere.dvzDecrease();
		}
		if (this.key.is('s')) {
			this.sphere.dvzIncrease();
		}
		if (this.key.is('a')) {
			this.sphere.dvxDecrease();
		}
		if (this.key.is('d')) {
			this.sphere.dvxIncrease();
		}
		let coordinates = this.sphere.getPosition();
		this.camera.changePosition({x: coordinates.x, y: coordinates.y + 100, z:coordinates.z + 200 });
		this.light.changePosition({x: coordinates.x, y: coordinates.y + 200, z:coordinates.z + 200});
	}

	renderer() {
		this.rendrer.render(this.scene, this.camera.getCamera());
	}

}

