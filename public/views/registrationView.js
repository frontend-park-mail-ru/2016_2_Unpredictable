(function () {
	'use strict';

	const RegistrationForm = window.RegistrationForm;
	const View = window.View;

	class RegView extends View {
		constructor() {
			super('js-reg');
			this.regForm = new RegistrationForm();
		}

		init() {
			this.regForm.onRegistration(this.showAppForm.bind(this));
			this.regForm.onBack(this.showSignForm.bind(this));
			this.regForm.renderTo(this.getElement());
		}

		resume() {
			if (window.localStorage.getItem('fromSign') === null) {
				this.showSignForm();
			} else {
				this.show();
			}
		}

		showAppForm() {
			return this.router.go('/app');
		}

		showSignForm() {
			return this.router.go('/');
		}

	}

	window.RegView = RegView;
})();

