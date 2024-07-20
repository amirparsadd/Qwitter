module.exports = {
  username: {
    isString: {
      errorMessage: "ERR_USERNAME_STRING"
    },
    notEmpty: {
      errorMessage:"ERR_USERNAME_EMPTY"
    },
    isLength: {
      options: {
        min:3,
        max:16
      }
    },
    errorMessage: "ERR_USERNAME_LEN_MIN3_MAX16"
  },
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