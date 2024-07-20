const LOGGER_NAME = "Auth Router"

const { Router } = require("express")
const passport = require("passport")
const startegy = require("../../localStartegy")
const { log } = require("../../utils/logger")
const inputValidator = require("../../middleware/inputValidator")
const { body, checkSchema } = require("express-validator")
const auth_base = require("../../schema/auth_base")

const router = Router()
log(LOGGER_NAME, "🌐 Router Is Up")

router.post("/",
  checkSchema(auth_base, ["body"]),
  inputValidator,
  passport.authenticate("local"),
  ( req, res ) => {
    res.sendStatus(200)
})

router.get("/status", ( req, res ) => {
  if(req.user) return res.status(200).send(req.user)
  res.sendStatus(401)
})

router.post("/logout", ( req, res ) => {
  if(!req.user) return res.sendStatus(401)
  
  req.logOut({}, err => {
    if(err) return res.status(500)
  })
})

module.exports = router