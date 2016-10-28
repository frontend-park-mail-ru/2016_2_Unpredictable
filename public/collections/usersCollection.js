(function () {
	class UsersCollection {
		constructor() {
			this._data = [
				{
					username: 'lalala',
					score: 213
				}, {
					username: 'lalala',
					score: 442
				}, {
					username: 'lalala',
					score: 212243
				}, {
					username: 'lalala',
					score: 3426
				}, {
					username: 'lalala',
					score: 13
				}, {
					username: 'Frosich123',
					score: 4534
				}, {
					username: 'lalala',
					score: 7423
				}, {
					username: 'lalala',
					score: 5645
				}, {
					username: 'lalala',
					score: 876
				},
			];
		}

		sort() {
			this._data = this._data.sort((a, b) => b.score - a.score);
		}

		getData() {
			return this._data;
		}
	}
	window.UsersCollection = UsersCollection;
})();
