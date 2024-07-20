const { validationResult } = require("express-validator")
const { generateJSONErrorWithValidator } = require("../utils/error")

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {Function} next
 */
module.exports = ( req, res, next ) => {
  const result = validationResult(req)
  if(!result.isEmpty()){
    return res.status(400).json(generateJSONErrorWithValidator(result))
  }
  next()
}