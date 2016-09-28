exports.post = {
	"tags": ["users"],
	"description": "Метод создания пользователя",

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
			"description": "Id пользователя",
		},
		"403": {
			"description": "Ошибка при выполнении запроса"
		}
	}
};

exports.get = {
	"tags": ["users"],
	"description": "Вывод всех пользователей",

	"response": {
		"200": {
			"description": "Все пользоваетли",
		},
		"403": {
			"descrition": "Ошибка выполнения запроса"
		}
	}
};