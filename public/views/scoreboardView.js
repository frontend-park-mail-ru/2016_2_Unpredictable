(function () {
	'use strict';

	const View = window.View;
	const UsersCollection = window.UsersCollection;
	const ScoreTable = window.ScoreTable;
	const fest = window.fest['templates/scoreboard'];
	const ScoreForm= window.ScoreForm;
	const Button = window.Button;

	class ScoreView extends View {

		constructor() {
			super('js-score');
		}

		/**
		 * Инициализация для вьюшки
		 * @param model - модель юзера
		 */
		init(model = {}) {
			this._user = new UsersCollection();
			this._user.sort();
			this.user = model.user;
			//this.board = new ScoreTable();
		}

		/**
		 * Вызывается при переходе на  вьюшку
		 */
		resume() {
			this._el.innerHTML = fest({items:this._user.getData()});
			this.button = new Button ('Назад', {});
			this.onBack(this.showMain.bind(this));
			this.getElement().appendChild(this.button._get());
			this.show();
		}

		/**
		 * Обработчик кнопки Baсл
		 * @param callback - функция, вызываемая при нажатии
		 */
		onBack(callback) {
			this.button.on('click', function (button) {
				button.preventDefault();
				callback();
			});
		}

		show() {
			setTimeout(() => {
				this._el.hidden = false;
				this._el.classList.toggle('js-score--hidden', false);
			}, 301);
		}

		pause() {
			//this._el.classList.toggle('js-score--hidden', true);
			this._el = {};
			this.hide();
		}

		hide() {
			setTimeout(() => {
				this._el.hidden = true;
			}, 300);
		}

		onBack(callback){
			this.button.on('click', function(button){
				button.preventDefault();
				callback();
			})
		}

		showMain() {
			console.log(this);
			this.pause();
			return this.router.go('/');
		}
	}

	window.ScoreView = ScoreView;
})();


