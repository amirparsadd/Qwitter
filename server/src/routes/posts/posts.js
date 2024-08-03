const LOGGER_NAME = "Posts Router"

const { Router } = require("express")
const { param, checkSchema, body } = require("express-validator")
const inputValidator = require("../../middleware/inputValidator")

const { getLatestPosts, createPost } = require("../../database/interactors/post")
const posts_get = require("../../schema/posts_get")
const { log } = require("../../utils/logger")
const requiresAuth = require("../../middleware/requiresAuth")
const posts_create = require("../../schema/posts_create")

const router = Router()
log(LOGGER_NAME, "🌐 Router Is Up")

router.get("/:batch/",
  requiresAuth,
  checkSchema(posts_get, ["params"]),
  inputValidator,
  async ( req, res ) => {
    const batch = req.params.batch || 0
    const result = await getLatestPosts([ batch * 50, (batch + 1) * 50 ])

    res.send(result)
})

router.delete("/",
  requiresAuth,
  body("uid")
    .isString()
    .withMessage("ERR_POST_UID_STRING")
    
    .isLength({ min: 24, max: 24 })
    .withMessage("ERR_POST_UID_LEN_24"),
  inputValidator,
  (req, res) => {
    
  })

router.post("/",
  requiresAuth,
  checkSchema(posts_create, ["body"]),
  inputValidator,
  async ( req, res ) => {
    const post = await createPost(req.user.dbid, req.body.content)

    if(!post) {
      res.status(400).send(generateJSONError({ msg: "ERR_UNEXPECTED", path: ""}))
      throw err
    }

    res.status(201).send(post)
  }
)

module.exports = router