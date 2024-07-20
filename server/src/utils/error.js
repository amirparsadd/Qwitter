function generateJSONErrorWithValidator(result, status = 400) {
  const error = result.array({onlyFirstError: true})[0]
  return {
    status,
    error: error.msg,
    path: error.path
  }
}

function generateJSONError(error, status = 400) {
  return {
    status,
    error: error.msg,
    path: error.path
  }
}

module.exports = {
  generateJSONError,
  generateJSONErrorWithValidator
}