const LOGGER_NAME = "User Router"

const { Router } = require("express")
const { param, checkSchema } = require("express-validator")
const inputValidator = require("../../middleware/inputValidator")
const { getUserById } = require("../../database/interactors/user")
const { mongo } = require("mongoose")
const { generateJSONError } = require("../../utils/error")
const { log } = require("../../utils/logger")
const requiresAuth = require("../../middleware/requiresAuth")
const user_id = require("../../schema/user_id")

const router = Router()
log(LOGGER_NAME, "🌐 Router Is Up")

router.get("/id/:id",
  requiresAuth,
  checkSchema(user_id, ["params"]),
  inputValidator,
  async ( req, res ) => {
    try {
      const user = await getUserById(new mongo.ObjectId(req.params["id"]), false, false)

      if(!user) {
        return res.status(400).send(generateJSONError({ msg: "ERR_USER_NOTFOUND", path: "id" }))
      }
      
      return res.status(200).send(user)

    } catch (err) {
      return res.status(500).generateJSONError({ msg: "ERR_UNEXPECTED", path: ""})
    }
  }
)

module.exports = router