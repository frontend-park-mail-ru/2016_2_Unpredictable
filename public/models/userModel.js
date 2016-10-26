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

		validatePassword (password, repeat = null) {
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

		validate(){
			const isLoginValid = this.validateLogin(this.info.login);
			const isPasswordValid = this.validatePassword(this.info.password, this.info.repeatPassword);
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
			let validation = this.validate();
			if (validation.error) {
				this._errorText = {};
				for(let key in validation) {
					if(key !== 'error') {
						this._errorText[key] = validation[key];
					}
				}
				return;
			}
			let params = {
				attrs: ['userId', 'sessionid'],
				body : this.info,
				oneMore: false,
				func: 'signin'
			};
			let url = 'api/sessions';
			return this.save(url, params);
		}

		signup(){
			let validation = this.validate();
			if (validation.error) {
				this._errorText = {};
				for(let key in validation) {
					if(key !== 'error') {
						this._errorText[key] = validation[key];
					}
				}
				return;
			}
			let params = {
				attrs: ['userid'],
				body : this.info,
				oneMore: true,
				func: 'signup'
			};
			let url = 'api/users';
			return this.save(url, params);

		}

		logout(){
			const sessionid = window.localStorage.getItem('sessionid');
			return this.deleteInfo(sessionid);
		}

		setUserInfo(newInfo){
			this.info = newInfo;
		}

		clear(){
			this.info = {};
		}

	}

	window.User = User;
})();

