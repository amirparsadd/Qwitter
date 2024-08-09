const LOGGER_NAME = "Post Action Router"

//IMPORTS
const { Router } = require("express")
const { checkSchema } = require("express-validator")
const inputValidator = require("../../../middleware/inputValidator")
const { log } = require("../../../utils/logger")
const requiresAuth = require("../../../middleware/requiresAuth")
const { generateJSONError } = require("../../../utils/error")
const HttpStatusCode = require("../../../httpStatusCodes")
//IMPORTS


const router = Router()
log(LOGGER_NAME, "🌐 Router Is Up")

module.exports = router