(function () {
	'use strict';

	const View = window.View;
	const MainForm = window.MainForm;

	class MainView extends View {

		constructor() {
			super('js-main');
		}

		init() {
			this.mainForm = new MainForm();
			this.mainForm.renderTo(this.getElement());
		}
	}

	window.MainView = MainView;
})();
