(function (){
	'use strict';

	const Model = window.Model;

	class User extends Model {

		constructor(body = {}, attributes = {}){
			super(attributes);
			this.body = body;
			console.log(this.body);
		}

		signIn(){

			// if (!this.validate()) {
			// 	return;
			// }
			this.params = {
				attrs: ['userId', 'sessionid'],
				body : this.body,
				oneMore: false,
				func: 'signin'
			};
			console.log(this.params);
			let url = 'api/sessions';
			return this.save(url, this.params);
		}

		signUp(){
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

		logOut(){
			const sessionid = window.localStorage.getItem('sessionid');
			return this.deleteInfo(sessionid);
		}

	}

	window.User = User;
})();

