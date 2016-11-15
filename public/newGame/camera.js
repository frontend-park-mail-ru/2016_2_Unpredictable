'use strict';

import THREELib from "three-js";
var THREE = THREELib(); // return THREE JS

export default class Camera {

	constructor({x = 0, y = 0, z = 0}){
		this.x = x;
		this.y = y;
		this.z = z;
	}

	setCamera(width, height){
		this.camera = new THREE.PerspectiveCamera( 45, width / height, 1, 1000 );
		this.camera.position.set(this.x, this.y, this.z);
		this.camera.rotation.x = 90 * Math.PI / 180;
	}

	getCamera(){
		return this.camera;
	}

	changePosition({x , y , z}){
		this.x = x;
		this.y = y;
		this.z = z;
		this.camera.position.set(this.x, this.y, this.z);
	}
}
