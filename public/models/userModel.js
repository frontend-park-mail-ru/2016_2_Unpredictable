(function (){
	'use strict';

	const Model = window.Model;

	class User extends Model {

		constructor(body = {}, attributes = {}){
			super(attributes);
			this.body = body;
		}

		validateLogin (login) {
			if (!login || login.length === 0) {
				return {
					errorText: 'Логин не должен быть пустым',
					error: true
				};
			}
			if (!login.match(/^[a-zA-Z0-9]{1,20}$/)) {
				return {
					errorText: 'Логин должен состоять из латинских букв или цифр и иметь длину не более 20 символов',
					error: true
				};
			}
			return {
			error: false
			};
		};

		validatePassword (password) {
			if (!password || password.length === 0) {
				return {
					errorText: 'Пароль не должен быть пустым',
					error: true
				};
			}
			if (!password.match(/^[a-z0-9]{6,20}$/i)) {
				return {
					errorText: 'Пароль должен состоять из латинских букв или цифр и иметь длину от 6 до 20 символов',
					error: true
				};
			}
			return {
				error: false
			};
		};

		validateIn() {
			const isLoginValid = this.validateLogin(this.body.login);
			const isPasswordValid = this.validatePassword(this.body.password);
			if (isLoginValid.error) {
				return {
					errorText : isLoginValid.errorText,
					valid : false
				}
			}
			if (isPasswordValid.error) {
				return {
					errorText : isPasswordValid.errorText,
					valid : false
				}
			}
			return {
				valid : true
			};
		}

		signin(){
			let validation = this.validateIn();
			if (!validation.valid) {
				this._errorText = validation.errorText;
				return;
			}
			this.params = {
				attrs: ['userId', 'sessionid'],
				body : this.body,
				oneMore: false,
				func: 'signin'
			};
			let url = 'api/sessions';
			return this.save(url, this.params);
		}

		signup(){
			// if (!this.validate()) {
				// 	return;
			// }
			this.params = {
				attrs: ['userid'],
				body : this.body,
				oneMore: true,
				func: 'signup'
			};
			let url = 'api/users';
			return this.save(url, this.params);

		}

		logout(){
			const sessionid = window.localStorage.getItem('sessionid');
			return this.deleteInfo(sessionid);
		}

	}

	window.User = User;
})();

