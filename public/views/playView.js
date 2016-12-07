'use strict';

import View from '../modules/view';
import DGame from '../newGame/newgame';

export default class PlayView extends View {
	constructor(tag, {user}) {
		super('js-play');
		this.game = new DGame();
		this.user = user;
	}


	init(options = {}) {
		this.game.init(this.getElement());
		this.game.animate();
	}

}

// 'use strict';
//
// import View from '../modules/view';
// import Game from '../game/game';
//
//
// export default class PlayView extends View {
// 	constructor() {
// 		super('js-play');
// 	}
//
// 	init() {
// 		this.canvas = this.getElement().querySelector('.js-canvas');
// 		this.canvas.width = '1024';
// 		this.canvas.height = '512';
// 		this.ctx = this.canvas.getContext('2d');
// 	}
//
// 	resume() {
// 		this._game = new Game({
// 			height: 512,
// 			width: 1024,
// 			ctx: this.ctx
// 		});
// 		this._game.start();
// 		super.resume();
// 	}
//
// }
