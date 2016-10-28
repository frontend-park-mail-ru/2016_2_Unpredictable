(function () {
	'use strict';

	const Form = window.Form;
	const Input = window.Input;
	const Button = window.Button;
	const Block = window.Block;
	const User = window.User;

	class PlayForm extends Form {
		constructor(options) {
			super(options);

			this._1player = new Block('a',{attrs: {
				href:'/play/1player'
			}});
			this._1player._get().innerText = `1 игрок`;
			this._2player = new Block('a',{attrs: {
				href:'/play/2players'
			}});
			this._2player._get().innerText = `2 игрока`;
			this._score = new Block('a',{attrs: {
				href:'/play/score'
			}});
			this._score._get().innerText = `Scoreboard`;
			this.append(this._1player._get());
			this.append(this._2player._get());
			this.append(this._score._get());
		}

	}

	window.PlayForm = PlayForm;

})();
