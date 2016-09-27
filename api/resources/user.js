exports.post = {
  "tags": ["user"],
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
      "schema": {
        "$ref": "#/definitions/Session"
      }
    },
    "403": {
      "description": "Ошибка при выполнении запроса"
    }
  }
};
