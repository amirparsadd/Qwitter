const LOGGER_NAME = "Auth Router"

//IMPORTS
const { Router } = require("express")
const passport = require("passport")
const startegy = require("../../localStartegy")
const { log } = require("../../utils/logger")
const inputValidator = require("../../middleware/inputValidator")
const { checkSchema } = require("express-validator")
const auth_base = require("../../schema/auth_base")
const requiresAuth = require("../../middleware/requiresAuth")
const { generateJSONError } = require("../../utils/error")
const HttpStatusCode = require("../../httpStatusCodes")
//IMPORTS

const router = Router()
log(LOGGER_NAME, "🌐 Router Is Up")

router.post("/",
  checkSchema(auth_base, ["body"]),
  inputValidator,
  ( req, res, next ) => {
    if(req.user) {
      return res.status(HttpStatusCode.FORBIDDEN).send(generateJSONError({ msg: "ERR_AUTHORIZED", path: "" }, HttpStatusCode.FORBIDDEN))
    }

    next()
  },
  passport.authenticate("local"),
  ( req, res ) => {
    res.sendStatus(HttpStatusCode.OK)
})

router.get("/status",
  requiresAuth,
  ( req, res ) => {
    return res.status(HttpStatusCode.OK).send(req.user)
})

router.post("/logout",
  requiresAuth,
  ( req, res ) => {
    req.logOut({}, err => {
      if(err) return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(generateJSONError({ msg: "ERR_UNEXPECTED", path: "" }, HttpStatusCode.INTERNAL_SERVER_ERROR))
      
      return res.status(200).send({ status: 200 })
    })
})

module.exports = router