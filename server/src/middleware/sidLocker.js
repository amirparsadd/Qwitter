/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res
 * @param {Function} next
 */
module.exports = ( req, res, next ) => {
  req.session.locked = true
  next()
}