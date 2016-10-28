(function () {
	'use strict';

	const RegistrationForm = window.RegistrationForm;
	const View = window.View;

	class RegView extends View {
		constructor() {
			super('js-reg');
			this.regForm = new RegistrationForm();
		}

		init(model = {}) {
			this.user = model.user;
			this.regForm.onRegistration(this.showAppForm.bind(this), this.user);
			this.regForm.onBack(this.showSignForm.bind(this), this.user);
			this.regForm.renderTo(this.getElement());
		}

		resume(model = {}) {
			this.regForm.clearInputErrors();
			// if (!this.user.fromSign) {
			// 	this.showSignForm();
			// } else {
				this.show();
			//}
		}

		show() {
			setTimeout(() => {
				this._el.hidden = false;
				this._el.classList.toggle('js-reg--hidden', false);
			}, 301);
		}

		pause() {
			this._el.classList.toggle('js-reg--hidden', true);
			this.hide();
		}

		hide() {
			setTimeout(() => {
				this._el.hidden = true;
			}, 300);
		}

		showAppForm() {
			this.hide();
			return this.router.go('/app', this.user);
		}

		showSignForm() {
			this.hide();
			return this.router.go('/', this.user);
		}

	}

	window.RegView = RegView;
})();

