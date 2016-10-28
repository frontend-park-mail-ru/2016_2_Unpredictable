(function () {
	'use strict';

	const Form = window.Form;
	const Input = window.Input;
	const Button = window.Button;
	const Block = window.Block;
	const User = window.User;
	const Link = window.Link;

	class MainForm extends Form {
		constructor(options) {
			super(options);
			this._header = new Block('h1', {
				attrs: {
					class: 'header'
				}
			});
			this._header._get().innerText = `TechnoOsmos`;

			this._authorization = new Button('SignIn/SignUp',{});
			this._singleplayer = new Button('SinglePlayer',{});
			this._score = new Button('ScoreBoard',{});

			this.append(this._header._get());
			this.append(this._authorization._get());
			this.append(this._singleplayer._get());
			this.append(this._score._get());
		}

		onAuth(callback){
			this._authorization.on('click', function(button){
				button.preventDefault();
				callback();
			})
		}

		onSingle(callback){
			this._singleplayer.on('click', function(button){
				button.preventDefault();
				callback();
			})
		}

		onScore(callback){
			this._score.on('click', function(button){
				button.preventDefault();
				callback();
			})
		}
	}

	window.MainForm = MainForm;

})();
