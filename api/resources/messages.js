exports.post = {
	"tags": ["message"],
	"description": "Метод создает новое сообщение",
	"parameters": [
		{
			"name": "id",
			"description": "Имя пользователя",
			"type": "string"
		},
		{
			"name": "message",
			"description": "Текст сообщения",
			"type": "string"
		}
	],
	"responses": {
		"200": {
			"schema": {
				"description": "Данные о созданом сообщение",
				"type": "#/definitions/Message"
			}
		},
		"400": {
			"description": "Ошибка при выполнении запроса"
		}
	}
};

exports.get = {
	"tags": ["message"],
	"description": "Метод получает список сообщений",

	"responses": {
		"200": {
			"schema": {
				"description": "Список сообщений",
				"type": "array",
				"items": {
					"$ref": "#/definitions/Message"
				}
			}
		}
	}

};
