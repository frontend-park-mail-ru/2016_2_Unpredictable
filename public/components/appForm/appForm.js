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
			this._logoutButton = new Button('Log out', {});
			this._scoreButton = new Button('ScoreBoard', {});
			this._score = new Block('a',{attrs: {
				href:'/app/score'
			}});
			this._score._get().innerText = `Scoreboard`;
			this._header = new Block('h1', {});
			this._header._get().innerText = `Hello, ${this._options.name || 'Anon'}`;
			this.append(this._header._get());
			this.append(this._logoutButton._get());
			this.append(this._scoreButton._get());
			this.append(this._score._get());
		}


		// TODO комментарии в стиле JSDoc

		/**
		 * Обработчик кнопки Логаута
		 * @param callback - функция, вызываемая при нажатии
		 * @param options - можель юзера
		 */
		onLogout(callback, options = {}) {
			this._logoutButton.on('click', function (e) {
				e.preventDefault();
				const model = new User();
				const res = model.logout(options.info.sessionid);
				if (res) {
					res.then(function () {
						callback();
					}).catch();
				}
			}.bind(this));
		}

		/**
		 * Обработчкуи кнопки вызова Таблицы рекордов
		 * @param callback - функция, вызываемая при нажатии
		 */
		onScore(callback){
			this._scoreButton.on('click', function (button){
				button.preventDefault();
				callback();
			})
		}

	}

	window.AppForm = AppForm;

})();
