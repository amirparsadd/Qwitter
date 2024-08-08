const LOGGER_NAME = "User Router"

//IMPORTS
const { Router } = require("express")
const { checkSchema } = require("express-validator")
const inputValidator = require("../../middleware/inputValidator")
const { getUserById } = require("../../database/interactors/user")
const { Types } = require("mongoose")
const { generateJSONError } = require("../../utils/error")
const { log } = require("../../utils/logger")
const requiresAuth = require("../../middleware/requiresAuth")
const user_id = require("../../schema/user_id")
const HttpStatusCode = require("../../httpStatusCodes")
//IMPORTS

const router = Router()
log(LOGGER_NAME, "🌐 Router Is Up")

router.get("/id/:id",
  requiresAuth,
  checkSchema(user_id, ["params"]),
  inputValidator,
  async ( req, res ) => {
    try {
      const user = await getUserById(Types.ObjectId(req.params["id"]), false, false)

      if(!user) {
        return res.status(HttpStatusCode.BAD_REQUEST).send(generateJSONError({ msg: "ERR_USER_NOTFOUND", path: "id" }))
      }
      
      return res.status(HttpStatusCode.OK).send(user)

    } catch (err) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(generateJSONError({ msg: "ERR_UNEXPECTED", path: ""}, HttpStatusCode.INTERNAL_SERVER_ERROR))
    }
  }
)

module.exports = router