const { generateJSONError } = require("../utils/error")

const REQUEST_DELAY = 1000

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res
 * @param {Function} next
 */
module.exports = ( req, res, next ) => {
  if(req.session.lastRequest + REQUEST_DELAY > Date.now()) return res.status(429).send(generateJSONError({ msg: "ERR_RATELIMIT", path: "" }, 429))

  req.session.lastRequest = Date.now()
  next()
}