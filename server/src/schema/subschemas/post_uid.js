module.exports = {
  isString: {
    errorMessage: "ERR_POST_UID_STRING"
  },
  isLength: { 
    options: {
      min: 36,
      max: 36
    },
    errorMessage: "ERR_POST_UID_LEN_36"
  }
}