(function () {
	'use strict';

	const fetch = window.fetch;
	const AppForm = window.AppForm;
	const View = window.View;

	class AppView extends View {
		constructor() {
			super('js-app');
		}

		init(model = {}) {
			this.user = model.user;
		}

		resume() {
			if (!this.user.fromSign) {
				this.showSignForm();
			} else {
				if (this.user.getLogin()) {
					this.appForm = new AppForm({
						name: this.user.getLogin()
					});
					this.appForm.onLogout(this.showSignForm.bind(this), this.user);
					this.appForm.onScore(this.showScoreTable.bind(this));
					this.appForm.renderTo(this.getElement());
				}
				this.show();
			}
		}

		show() {
			setTimeout(() => {
				this._el.hidden = false;
				this._el.classList.toggle('js-app--hidden', false);

			}, 301);
		}

		pause() {
			if (this.user.fromSign) {
				this.getElement().removeChild(this.appForm._get());
			}
			this._el.classList.toggle('js-app--hidden', true);
			this.hide();
		}

		hide() {
			setTimeout(() => {
				this._el.hidden = true;
			}, 300);
		}

		showScoreTable(){
			this.router.go('/score/', this.user);
		}

		showSignForm() {
			return this.router.go('/', this.user);
		}

	}

	window.AppView = AppView;
})();
