const LOGGER_NAME = "Posts Router"

const { Router } = require("express")
const { param, checkSchema, body } = require("express-validator")
const inputValidator = require("../../middleware/inputValidator")

const { getLatestPosts, createPost } = require("../../database/interactors/post")
const posts_get = require("../../schema/posts_get")
const { log } = require("../../utils/logger")
const requiresAuth = require("../../middleware/requiresAuth")

const router = Router()
log(LOGGER_NAME, "🌐 Router Is Up")

router.get("/:batch/",
  requiresAuth,
  checkSchema(posts_get, ["params"]),
  inputValidator,
  async ( req, res ) => {
    const batch = req.params.batch || 0
    const result = await getLatestPosts([ batch * 50, (batch + 1) * 50 ]);

    res.send(result)
})

router.post("/",
  requiresAuth,
  body("content")
    .isString()
    .withMessage("ERR_CONTENT_STRING")
    
    .notEmpty()
    .withMessage("ERR_CONTENT_EMPTY")
    
    .isLength({ min: 10, max: 500 })
    .withMessage("ERR_CONTENT_EMPTY"),
  inputValidator,
  ( req, res ) => {
    createPost(req.user, req.body.content)
  }
)

module.exports = router