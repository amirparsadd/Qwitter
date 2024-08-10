module.exports = {
  isString: {
    errorMessage: "ERR_DBID_STRING"
  },
  isLength: {
    options: {
      min: 24,
      max: 24
    },
    errorMessage: "ERR_DBID_LEN_24"
  }
}