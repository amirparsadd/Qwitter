const LOGGER_NAME = "Posts Router"

const { Router } = require("express")
const { param, checkSchema, body } = require("express-validator")
const inputValidator = require("../../middleware/inputValidator")

const { getLatestPosts, createPost, getPostByUID, deletePostByUID } = require("../../database/interactors/post")
const posts_get = require("../../schema/posts_get")
const { log } = require("../../utils/logger")
const requiresAuth = require("../../middleware/requiresAuth")
const posts_create = require("../../schema/posts_create")
const { generateJSONError } = require("../../utils/error")
const post_delete = require("../../schema/post_delete")

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

router.delete("/:uid/",
  requiresAuth,
  checkSchema(post_delete, ["params"]),
  inputValidator,
  async (req, res) => {
    const post = await getPostByUID(req.params.uid)
    
    if(req.user.dbid != post.author.dbid) return res.status(403).send(generateJSONError({ msg: "ERR_POST_OWNERSHIP", path: "uid" }, 403))
      
    const action = await deletePostByUID(req.params.uid)
    
    if(action){
      return res.sendStatus(200)
    } else {
      return res.status(500).send(generateJSONError({ msg: "ERR_UNEXPECTED", path: "" }, 500))
    }
})

module.exports = router