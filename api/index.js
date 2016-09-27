module.exports = {
	"swagger": "2.0",
	"info": {
		"version": "0.0.3",
		"title": "TechnoChat API",
		"description": "**ТехноЧат**"
	},
	"basePath": "/api",
	"schemes": ["http", "https"],
	"host": "http://localhost:3000",

	paths: {
		'/messages': require('./resources/messages')
		// TODO
		/*
		'/users': require('./resourses/users'),
		'/users/:id': require('./resourses/user'),
		'/sessions': require('./resourses/sessions'),
		'/sessions/:sessionid': require('./resourses/session')


		*/
	},

	definitions: {
		Message: require('./scheme/Message'),
		// TODO
		/*
		User: require(...),
		Session: require(...)

		*/
	}

};
