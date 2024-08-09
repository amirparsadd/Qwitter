const { validationResult } = require("express-validator")
const { generateJSONErrorWithValidator } = require("../utils/error")
const HttpStatusCode = require("../httpStatusCodes")

/**
 * Validates input with `express-validator`
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {Function} next
 */
module.exports = ( req, res, next ) => {
  const result = validationResult(req)
  if(!result.isEmpty()){
    return res.status(HttpStatusCode.BAD_REQUEST).json(generateJSONErrorWithValidator(result))
  }
  next()
}