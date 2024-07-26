const LOGGER_NAME = "Logger Middleware"

const { log } = require("../utils/logger")

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res
 * @param {Function} next
 */
module.exports = ( req, res, next ) => {
  log(LOGGER_NAME, `💬 New Request At ${req.url}`)

  next()
}