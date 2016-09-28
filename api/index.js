module.exports = {
	"swagger": "2.0",
	"info": {
		"version": "0.0.3",
		"title": "TechnoOsmos API",
		"description": "**ТехноОсмос**"
	},
	"basePath": "/api",
	"schemes": ["http", "https"],
	"host": "https://unpredictable.herokuapp.com/",

	paths: {
		'/users': require('./resources/users'),
		'/users/:id': require('./resources/user'),
		'/sessions': require('./resources/sessions'),
		'/sessions/:sessionid': require('./resources/session')
	},
	definitions: {
		Session: require('./scheme/Session'),
		User: require('./scheme/User'),
	}

};
