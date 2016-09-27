exports.get = {
  "tags": ["user"],
  "description": "Метод получения информации о пользователе",

  "parameters": [
    {
      "name": "id",
      "description": "Id сессии",
      "type": "integer",
      "in": "path",
      "required": true
    },
  ],

  "responses": {
    "200": {
      "description": "Информация о пользователе",
      "schema": {
        "$ref": "#/definitions/User"
      }
    },
    "401": {
      "description": "Ошибка при выполнении запроса"
    }
  }
};

exports.delete = {
  "tags": ["user"],
  "description": "Метод удаления пользователя",

  "parameters": [
    {
      "name": "id",
      "description": "Id сессии",
      "type": "integer",
      "in": "path",
      "required": true
    },
  ],

  "responses": {
    "200": {
      "description": "Успешный запрос"
    },
    "403": {
      "description": "Ошибка при выполнении запроса"
    }
  }
};
