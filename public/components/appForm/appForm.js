(function () {
	'use strict';

	const Form = window.Form;
	const Input = window.Input;
	const Button = window.Button;
	const Block = window.Block;
	const User = window.User;

	class AppForm extends Form {
		constructor(options) {
			super(options);
			this._header = new Block('h1', {
				attrs: {
					class: 'header'
				}
			});
			this._header._get().innerText = `TechnoOsmos`;

			this._logoutButton = new Button('Log out', {});

			this._singleplayer = new Block('a',{attrs: {
				href:'/singleplayer'
			}});
			this._singleplayer._get().innerText = `SinglePlayer`;

			this._multiplayer = new Block('a',{attrs: {
				href:'/multiplayer'
			}});

			this._multiplayer._get().innerText = `MultiPlayer`;
			this._score = new Block('a',{attrs: {
				href:'/score'
			}});
			this._score._get().innerText = `ScoreBoard`;


			this.append(this._header._get());
			this._header2= new Block('h2', {});
			this._header2._get().innerText = `Hello, ${this._options.name || 'Anon'}`;
			this.append(this._header2._get());
			this.append(this._singleplayer._get());
			this.append(this._multiplayer._get());
			this.append(this._score._get());
			this.append(this._logoutButton._get());
		}


		// TODO комментарии в стиле JSDoc

		onLogout(callback) {
			this._logoutButton.on('click', function (e) {
				e.preventDefault();
				const model = new User();
				const res = model.logout();
				if (res) {
					res.then(function () {
						callback();
					}).catch();
				}
			}.bind(this));
		}

	}

	window.AppForm = AppForm;

})();
