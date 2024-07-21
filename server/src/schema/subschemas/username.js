module.exports = {
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
    },
    errorMessage: "ERR_USERNAME_LEN_MIN3_MAX16"
  }
}