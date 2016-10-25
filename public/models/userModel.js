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
				};
			}
			if (!login.match(/^[a-zA-Z0-9]{1,20}$/)) {
				return {
					errorText: 'Логин должен состоять из латинских букв или цифр и иметь длину не более 20 символов',
				};
			}
			return {};
		};

		validatePassword (password, repeat = {}) {
			if (!password || password.length === 0) {
				return {
					errorText: 'Пароль не должен быть пустым',
				};
			}
			if (!password.match(/^[a-z0-9]{6,20}$/i)) {
				return {
					errorText: 'Пароль должен состоять из латинских букв или цифр и иметь длину от 6 до 20 символов',
				};
			}
			if(repeat && repeat !== password){
				return {
					errorText: 'Пароли не совпадают',
				};
			}
			return {};
		};

		validateIn() {
			const isLoginValid = this.validateLogin(this.body.login);
			const isPasswordValid = this.validatePassword(this.body.password);
			if (isLoginValid !== {}) {
				return {
					errorText : isLoginValid.errorText,
				}
			}
			if (isPasswordValid.error !== {}) {
				return {
					errorText : isPasswordValid.errorText,
				}
			}
			return {};
		}

		validateUp(){
			const isLoginValid = this.validateLogin(this.body.login);
			const isPasswordValid = this.validatePassword(this.body.password, this.body.repeatPassword);
			let result = {};
			if (isLoginValid.errorText) {
				result.error = true;
				result._errorTextLogin = isLoginValid.errorText;
			}
			if (isPasswordValid.errorText) {
				result.error = true;
				result._errorTextPassword = isPasswordValid.errorText;
			}
			return result;
		}

		signin(){
			let validation = this.validateIn();
			if (validation.errorText) {
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
			let validation = this.validateUp();
			if (validation.error) {
				this._errorText = validation;
				return;
			}
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

