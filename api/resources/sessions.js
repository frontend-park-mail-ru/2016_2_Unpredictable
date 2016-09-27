exports.delete = {
	"tags": ["session"],
	"description": "Метод логаута пользователя",

	"responses": {
		"200": {
			"description": "Успешный запрос"
		},
		"400": {
			"description": "Ошибка при выполнении запроса"
		}
	},
	"x-amples": [{
		"description": "логаут пользователя",
		"request": {
			"params": {}
		},
		"response": {
			"status": 200,
			"headers": {
				"content-type": "application/json"
			}
		}
	}]
};
