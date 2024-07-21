const LOGGER_NAME = "User Router"

const { Router } = require("express")
const { param } = require("express-validator")
const inputValidator = require("../../middleware/inputValidator")
const { getUserById } = require("../../database/interactors/user")
const { mongo } = require("mongoose")
const { generateJSONError } = require("../../utils/error")
const { log } = require("../../utils/logger")

const router = Router()
log(LOGGER_NAME, "🌐 Router Is Up")

router.get("/id/:id",
  param("id")
    .isString()
    .withMessage("ERR_ID_STRING")
    
    .isLength({
      min: 24,
      max: 24
    })
    .withMessage("ERR_LEN"),
    inputValidator,
    async ( req, res ) => {
      try {
        const user = await getUserById(new mongo.ObjectId(req.params["id"]), false, false)

        if(!user) {
          return res.status(400).send(generateJSONError({ msg: "ERR_USER_NOTFOUND", path: "id" }))
        }
        
        return res.status(200).send(user)

      } catch (err) {
        return res.sendStatus(500)
      }
    }
)

module.exports = router