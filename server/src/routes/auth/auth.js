const LOGGER_NAME = "Auth Router"

const { Router } = require("express")
const passport = require("passport")
const startegy = require("../../localStartegy")
const { log } = require("../../utils/logger")

const router = Router()
log(LOGGER_NAME, "Router Is Up")

router.post("/",
  passport.authenticate("local"),
  ( req, res ) => {
    
})

module.exports = router