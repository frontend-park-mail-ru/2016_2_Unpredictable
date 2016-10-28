(function () {
	'use strict';

	const Form = window.Form;
	const Input = window.Input;
	const Button = window.Button;
	const Block = window.Block;
	const User = window.User;

	class MainForm extends Form {
		constructor(options) {
			super(options);
			this._header = new Block('h1', {
				attrs: {
					class: 'header'
				}
			});
			this._header._get().innerText = `TechnoOsmos`;

			this._authorization = new Block('a',{attrs: {
				href:'/authorization'
			}});
			this._authorization._get().innerText = `SignIn/SignUp`;
			this._singleplayer = new Block('a',{attrs: {
				href:'/singleplayer'
			}});
			this._singleplayer._get().innerText = `SinglePlayer`;
			this._score = new Block('a',{attrs: {
				href:'/score'
			}});
			this._score._get().innerText = `ScoreBoard`;

			this.append(this._header._get());
			this.append(this._authorization._get());
			this.append(this._singleplayer._get());
			this.append(this._score._get());

		}
	}

	window.MainForm = MainForm;

})();
