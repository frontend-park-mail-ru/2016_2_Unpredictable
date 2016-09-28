module.exports = {
	"type": "object",
	"description": "Сессия",

	"properties": {
		"sessionid": {
			"description": "Id авторизационной сессии",
			"type": "integer",
			"minimum": 0
		},
		"userid": {
			"description": "Id пользователя, связанного с сессией",
			"type": "integer",
			"minimum": 0
		}
	},

	"required": ["sessionid", "userid"]
};
