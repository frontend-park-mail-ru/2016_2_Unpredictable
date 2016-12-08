'use strict';

import View from '../modules/view';
import DGame from '../newGame/singleplayer';

export default class SinglePlayView extends View {
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