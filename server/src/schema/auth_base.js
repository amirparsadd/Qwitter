const username = require("./subschemas/username");

module.exports = {
  username,
  password: {
    isString: {
      errorMessage: "ERR_PASSWORD_STRING"
    },
    notEmpty: {
      errorMessage:"ERR_PASSWORD_EMPTY"
    },
    isLength: {
      options: {
        min:6,
        max:24
      }
    },
    errorMessage: "ERR_PASSWORD_LEN_MIN6_MAX24"
  }
}