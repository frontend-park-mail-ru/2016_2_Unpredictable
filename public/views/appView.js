'use strict';

import View from '../modules/view';
import AppForm from '../components/appForm/appForm';


export default class AppView extends View {
	constructor(tag, {user}) {
		super('js-app');
		this._user = user;
	}

	init() {
		this.appForm = new AppForm(this._user, this.goMain.bind(this));
		this.appForm.renderTo(this.getElement());
	}

	resume(){
		if(!this._user.checked){
			this.show();
		}
	}

	goMain() {
		this.router.go('/');
	}

}
