exports.post = {
	"tags": ["session"],
	"description": "Метод логина пользователя",
	"parameters": [
		{
			"name": "login",
			"description": "Логин пользователя",
			"type": "string"
		},
		{
			"name": "password",
			"description": "Пароль пользователя",
			"type": "string"
		}
	],
	"responses": {
		"200": {
			"description": "Id сессии",
			"schema": {
				"$ref": "#/definitions/Session"
			},
			"400": {
				"description": "Ошибка при выполнении запроса"
			}
		}
	}
};
