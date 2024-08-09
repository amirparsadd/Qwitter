const HttpStatusCode = require("../httpStatusCodes")
const { generateJSONError } = require("../utils/error")

/**
 * Throws A 401 If The User Is Unauthorized
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res
 * @param {Function} next
 */
module.exports = ( req, res, next ) => {
  if (!req.user) return res.status(HttpStatusCode.UNAUTHORIZED).send(generateJSONError({ msg: "ERR_UNAUTHORIZED" }, HttpStatusCode.UNAUTHORIZED))
  next()
}