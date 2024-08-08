/**
 * Create A JSON Error From The Result Of express-validator
 * 
 * @param {import("express-validator").ResultFactory} result 
 * @param {HttpStatusCode} status 
 * @returns {ServerError}
 */
function generateJSONErrorWithValidator(result, status = HttpStatusCode.BAD_REQUEST) {
  const error = result.array({onlyFirstError: true})[0]
  return {
    status,
    error: error.msg,
    path: error.path
  }
}

/**
 * Create a JSON Error
 * 
 * @param {ServerError} error
 * @param {HttpStatusCode} status 
 * @returns {ServerError}
 */
function generateJSONError(error, status = HttpStatusCode.BAD_REQUEST) {
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