'use strict';

import View from '../modules/view';
import DGame from '../newGame/newgame';

export default class PlayView extends View {

	constructor() {
		super('js-play');
		this.game = new DGame();
	}


	init(options = {}) {
		this.game.init(this.getElement());
		this.user = options;
	}

	resume(options = {}) {
		this.show();
	}

	show() {
		this.getElement().hidden = false;
		this.game.animate();
	}
}

