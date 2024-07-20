const { validationResult } = require("express-validator")
const { generateJSONErrorWithValidator } = require("../utils/error")

module.exports = ( req, res, next ) => {
  const result = validationResult(req)
  if(!result.isEmpty()){
    return res.status(400).json(generateJSONErrorWithValidator(result))
  }
  next()
}