(function (){
	'use strict';

	const Model = window.Model;

	class Sign extends Model {

		constructor(attributes = {}){
			super(attributes);
		}

		signIn(params){

			// if (!this.validate()) {
			// 	return;
			// }
			this.params = {
				attrs: ['userId', 'sessionid'],
				body : params,
				oneMore: false,
				func: 'signin'
			};

			let url = 'api/sessions';
			return this.save(url);
		}

		signUp(params){
			// if (!this.validate()) {
				// 	return;
			// }
			this.params = {
				url: 'api/users',
				attrs: ['userid'],
				body: params,
				oneMore: true,
				func: 'signup'
			};
			let url = 'api/users';
			return this.save(url);

		}

	}

	window.Sign = Sign;
})();

