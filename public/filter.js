(function () {
	function filter(str, rules = ['KEK', 'Apple', 'Orange', 'OrangeJuce']) {
		for (let i = 0; i < rules.length; i++) {
			let regexp = new RegExp('\\b(' + rules[i] + ')\\b', 'gi');
			str = str.replace(regexp, new Array(rules[i].length + 1).join("*"));
		}
		return str;
	}

	if (typeof exports === 'object') {
		exports.filter = filter;
	}
})();
