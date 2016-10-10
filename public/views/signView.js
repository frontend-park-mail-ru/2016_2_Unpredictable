(function () {
	'use strict';

	const SignForm = window.SignForm;
	const View = window.View;

	class SignView extends View {
		constructor() {
			super('js-sign');
			this.showSignForm();
		}

		showSignForm() {
			const signForm = new SignForm();
			signForm.onSignin(this.showAppForm.bind(this));
			signForm.onSignup(this.showAppForm.bind(this));
			signForm.renderTo(this.getElement());
		};

		showAppForm() {
			this.hide();
			return this.router.go('/logout');

		};

	}

	window.SignView = SignView;
})();
