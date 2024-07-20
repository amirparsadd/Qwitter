module.exports = {
  batch: {
    optional: true,
    isNumeric: {
      errorMessage: "ERR_BATCH_NUMERIC"
    },
    isInt: {
      errorMessage: "ERR_BATCH_INTEGER"
    }
  }
}