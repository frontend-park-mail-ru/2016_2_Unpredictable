(function () {
	'use strict';

	const Model = window.Model;

	class ScoreTable extends Model {
		constructor(attributes = {}) {
			super(attributes);
		}

		getScore() {
			let params = {
				attrs: [],
				oneMore: false,
			};
			let url = 'api/users';
			this.getInfo(url, params);
		}
	}


	window.ScoreTable = ScoreTable;


})();

