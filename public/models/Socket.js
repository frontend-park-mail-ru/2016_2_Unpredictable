'use strict';

import KeyMaster from '../newGame/keymaster';
import THREELib from "three-js";
var THREE = THREELib(); // return THREE JS

export default class Socket {
	constructor() {
		this.socket = new WebSocket('wss://warm-fortress-86891.herokuapp.com/game');
		this.fisrtMessage = {
			type: "ru.mail.park.mechanics.requests.JoinGame$Request",
			content: "{}"
		};
	}

	init(key) {
		this.workOpen(key);
		this.workMessage();
		this.workClose();
	}

	workOpen(key) {
		this.socket.onopen = (event, key) => {
			console.log("socket open");
			this.send();
		}
	}

	send(){
		this.socket.send(JSON.stringify(this.fisrtMessage))
	}

	workMessage(event, dots, players) {
		console.log("socket answer");
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
