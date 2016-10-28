(function () {
	'use strict';

	const SignForm = window.SignForm;
	const View = window.View;

	class SignView extends View {
		constructor() {
			super('js-sign');
			this.signForm = new SignForm();
		}

		init() {
			this.signForm.onSignin(this.showAppForm.bind(this));
			this.signForm.onSignup(this.showRegForm.bind(this));
			this.signForm.renderTo(this.getElement());
		}

		showAppForm() {
			return this.router.go('/app');
		}

		showRegForm() {
			window.localStorage.setItem('fromSign', 'true');
			return this.router.go('/signup');
		}

		resume() {
			this.show();
		}

		show() {
			setTimeout(() => {
				this._el.hidden = false;
				this._el.classList.toggle('js-sign--hidden', false);

			}, 301);
		}


		pause() {
			this._el.classList.toggle('js-sign--hidden', true);
			this.hide();
		}

		hide() {
			setTimeout(() => {
				this._el.hidden = true;
			}, 300);
		}

	}

	window.SignView = SignView;
})();
