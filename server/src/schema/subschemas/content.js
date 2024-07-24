module.exports = {
  isString: {
    errorMessage: "ERR_CONTENT_STRING"
  },
  notEmpty: {
    errorMessage: "ERR_CONTENT_EMPTY"
  },
  isLength: {
    options: {
      min: 10,
      max: 500
    },
    errorMessage: "ERR_CONTENT_LEN_MIN10_MAX500"
  }
}