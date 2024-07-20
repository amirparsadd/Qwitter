const LOGGER_NAME = "Posts Router"

const { Router } = require("express")
const { param, checkSchema } = require("express-validator")
const inputValidator = require("../../middleware/inputValidator")

const { getLatestPosts } = require("../../database/interactors/post")
const posts_get = require("../../schema/posts_get")
const { log } = require("../../utils/logger")

const router = Router()
log(LOGGER_NAME, "🌐 Router Is Up")

router.get("/:batch/",
  checkSchema(posts_get, ["params"]),
  inputValidator,
  async ( req, res ) => {
    const batch = req.params.batch || 0
    const result = await getLatestPosts([ batch * 50, (batch + 1) * 50 ]);

    res.send(result)
})

module.exports = router