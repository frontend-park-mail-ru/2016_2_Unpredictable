(function(){
	'use strict';

	const THREE = window.THREE;

	class DGame {
		constructor(){
			this.width = 600;
			this.height = 500;
		}

		init(element){
			this.rendrer = new THREE.WebGLRenderer({antialias : true});

			this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 20000);
			this.camera.position.x = 100;
			this.camera.position.y = 100;
			this.camera.position.z = 100;
			this.camera.rotation.x = 90 * Math.PI / 180;

			this.scene = new THREE.Scene();

			this.floor = new THREE.CubeGeometry(100,100,10);
			this.floormesh = new THREE.Mesh(this.floor, new THREE.MeshPhongMaterial({color: 'green', opacity : 0.9}));
			this.floormesh.position.set(100, 100, 100);
			this.floormesh.rotation.x = 90 * Math.PI / 180 ;
			this.scene.add(this.floormesh);

			this.light = new THREE.PointLight(0xffffff, 1, 20);
			this.light.position.set(0,0,0);
			this.light.lookAt(this.floormesh.position);
			this.scene.add(this.light);

			this.rendrer.setSize(this.width, this.height);
			//this.rendrer.setClearColor(0x333F47);
			this.rendrer.render(this.scene, this.camera);
			element.appendChild(this.rendrer.domElement);
			console.log(this.scene);
		}

		animate(){
			let doAnimate = () =>{
				//this.init();
				requestAnimationFrame(doAnimate);
			};
			doAnimate();

		}
	}

	window.DGame = DGame;
}());

