'use strict';

import View from '../modules/view';
import MainForm from '../components/mainForm/mainForm';


export default class MainView extends View {
	constructor(tag, {user}) {
		super('js-main');
		this._user = user;
	}

	init() {
		this.mainForm = new MainForm();
		this.mainForm.renderTo(this.getElement());
	}

	resume() {
		if (!this._user.checked) {
			this.show();
		}
	}

}
