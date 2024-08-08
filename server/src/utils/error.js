const HttpStatusCode = require("../httpStatusCodes")

/**
 * Create A JSON Error From The Result Of express-validator
 * 
 * @param {import("express-validator").ResultFactory} result 
 * @param {number} status 
 * @returns {IServerError}
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
 * @param {IServerError} error
 * @param {number} status 
 * @returns {IServerError}
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