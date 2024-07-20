const { Router } = require("express")

// STATICS
const LOGGER_NAME = "API Router"
// STATICS

// ROUTERS
const auth = require("./auth")
const posts = require("./posts")
const { log } = require("../utils/logger")
// ROUTERS

const router = Router()

router.use("/auth", auth)
router.use("/posts", posts)
log(LOGGER_NAME, "API Router Is Up")

module.exports = router
