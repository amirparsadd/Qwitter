const LOGGER_NAME = "Auth Router"

const { Router } = require("express")
const passport = require("passport")
const startegy = require("../../localStartegy")
const { log } = require("../../utils/logger")
const inputValidator = require("../../middleware/inputValidator")
const { body, checkSchema } = require("express-validator")
const auth_base = require("../../schema/auth_base")
const { generateJSONError } = require("../../utils/error")
const { getUserByUsername, createUser } = require("../../database/interactors/user")
const requiresAuth = require("../../middleware/requiresAuth")
const { hashPassword } = require("../../utils/hashing")

const router = Router()
log(LOGGER_NAME, "🌐 Router Is Up")

router.post("/",
  checkSchema(auth_base, ["body"]),
  inputValidator,
  passport.authenticate("local"),
  ( req, res ) => {
    res.sendStatus(200)
})

router.post("/signup",
  checkSchema(auth_base, ["body"]),
  inputValidator,
  /**
   * 
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   * @returns 
   */
  async ( req, res ) => {
    const { body } = req

    if(req.user) return res.status(400).send(generateJSONError({ msg: "ERR_AUTHORIZED", path: ""}))
    if(await getUserByUsername(body["username"], false, false)) return res.status(400).send(generateJSONError({ msg: "ERR_USERNAME_EXISTS", path: "username"}))

    try {
      const user = await createUser(body["username"], hashPassword(body["password"]))

      res.status(201).send(user)
    }catch(err){
      res.status(400).send(generateJSONError({ msg: "ERR_UNEXPECTED", path: ""}))
      throw err
    }
})

router.get("/status", ( req, res ) => {
  if(req.user) return res.status(200).send(req.user)
  res.sendStatus(401)
})

router.post("/logout",
  requiresAuth,
  ( req, res ) => {
    req.logOut({}, err => {
      if(err) return res.sendStatus(500)
      
      return res.sendStatus(200)
    })
})

module.exports = router