(function () {
	'use strict';

	const SignForm = window.SignForm;
	const View = window.View;

	class SignView extends View {
		constructor() {
			super('js-sign');
			this.signForm = new SignForm();
		}

		init(model = {}) {
			this.signForm.clearInputErrors();
			this.user = model.user;
			this.signForm.onSignin(this.showAppForm.bind(this), this.user);
			this.signForm.onSignup(this.showRegForm.bind(this), this.user);
			this.signForm.renderTo(this.getElement());
		}

		resume(options = {}) {
			this.signForm.clearInputErrors();
			this.user.fromSign = true;
			this.show();
		}


		showAppForm() {
			this.hide();
			return this.router.go('/app', this.user);
		}

		showRegForm() {
			this.hide();
			return this.router.go('/signup', this.user);
		}

	}

	window.SignView = SignView;
})();
