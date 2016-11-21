'use strict';

import View from '../modules/view';
import ScoreTable from '../collections/UsersCollection';
import ScoreForm from '../components/scoreboardForm/scoreboardForm';
import Button from '../components/button/button';
import template from '../templates/scoreboard.tmpl.xml';

export default class ScoreView extends View {

	constructor() {
		super('js-score');
	}

	/**
	 * Инициализация для вьюшки
	 * @param model - модель юзера
	 */
	init(model = {}) {
		//this._user = new UsersCollection();
		//this._user.sort();
		this.user = model.user;
		this.board = new ScoreTable();
	}

	/**
	 * Вызывается при переходе на  вьюшку
	 */
	resume() {
		this.board.getScore().then((data) => {
			console.log(data);
			this._el.innerHTML = template({items: data});
			this.button = new Button('Назад', {});
			this.onBack(this.showMain.bind(this));
			this.getElement().appendChild(this.button._get());
			this.show();
		})
	}


	show() {
		setTimeout(() => {
			this._el.hidden = false;
			this._el.classList.toggle('js-score--hidden', false);
		}, 301);
	}

	pause() {
		console.log(this._el);
		this._el.classList.toggle('js-score--hidden', true);
		//this._el = {};
		this.hide();
	}

	hide() {
		setTimeout(() => {
			this._el.hidden = true;
		}, 300);
	}

	onBack(callback) {
		this.button.on('click', function (button) {
			button.preventDefault();
			callback();
		}.bind(this))
	}

	showMain() {
		console.log(this._el);
		return this.router.go('/');
	}
}



