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
log(LOGGER_NAME, "🌐 Router Is Up")

router.use("/auth", auth)
router.use("/posts", posts)

module.exports = router
