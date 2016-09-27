module.exports =  {
  "type": "object",
  "description": "Пользователи",

  "properties": {
    "login": {
      "description": "Логин пользователя",
      "type": "string",
    },
    "password": {
      "description": "Пароль пользователя",
      "type": "string",
    },
    "score": {
      "description": "Идентификатор сообщения",
      "type": "integer",
    },
    "id": {
      "description": "Идентификатор сообщения",
      "type": "integer",
    }
  },

  "required": ["login", "password", "score", "id"]
};
