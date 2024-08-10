const LOGGER_NAME = "Post Action Router"

//IMPORTS
const { Router } = require("express")
const { checkSchema } = require("express-validator")
const inputValidator = require("../../../middleware/inputValidator")
const { log } = require("../../../utils/logger")
const requiresAuth = require("../../../middleware/requiresAuth")
const { generateJSONError } = require("../../../utils/error")
const HttpStatusCode = require("../../../httpStatusCodes")
const post_action_global = require("../../../schema/post_action_global")
//IMPORTS

const router = Router()
log(LOGGER_NAME, "🌐 Router Is Up")

router.post("/",
  requiresAuth,
  checkSchema(post_action_global, [ "body" ]),
  inputValidator,
  async ( req, res ) => {
    // Create An Action
})

router.delete("/",
  requiresAuth,
  checkSchema(post_action_global, [ "body" ]),
  inputValidator,
  async ( req, res ) => {
    // Delete An Action
})

module.exports = router