module.exports = {
  isString: {
    errorMessage: "ERR_POST_UID_STRING"
  },
  isLength: { 
    options: {
      min: 24,
      max: 24
    },
    errorMessage: "ERR_POST_UID_LEN_24"
  }
}