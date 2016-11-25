'use strict';

import KeyMaster from '../newGame/keymaster';
import THREELib from "three-js";
var THREE = THREELib(); // return THREE JS

export default class Socket {
	constructor() {
		this.socket = new WebSocket('');
		this.key = new KeyMaster();
	}

	init(key) {
		this.workOpen(key);
		this.workMessage();
		this.workClose();
	}

	workOpen(key) {
		this.socket.onopen = function (event, key) {
			this.key.init();
			key = this.key;
		}
	}

	workMessage(event, dots, players) {
		this.socket.onmessage = function (event, players, dots) {
			let i;
			for (i = 0; i < players.length; ++i) {
				players[i].position.set(JSON.parse(event.data));
			}
			for (i = 0; i < players.dots; ++i) {
				dots[i].position.set(JSON.parse(event.data));
			}
		}
	}

	workClose(event) {
		this.socket.onerror = function (event) {

		}
	}
}
