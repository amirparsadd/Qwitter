const LOGGER_NAME = "Posts Router"

//IMPORTS
const { Router } = require("express")
const { checkSchema } = require("express-validator")
const inputValidator = require("../../middleware/inputValidator")
const { getLatestPosts, createPost, getPost, deletePost } = require("../../database/interactors/post")
const posts_get = require("../../schema/posts_get")
const { log } = require("../../utils/logger")
const requiresAuth = require("../../middleware/requiresAuth")
const posts_create = require("../../schema/posts_create")
const { generateJSONError } = require("../../utils/error")
const post_delete = require("../../schema/post_delete")
const HttpStatusCode = require("../../httpStatusCodes")
//IMPORTS


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
      res.status(HttpStatusCode.BAD_REQUEST).send(generateJSONError({ msg: "ERR_UNEXPECTED", path: ""}))
      throw err
    }
    
    res.status(HttpStatusCode.CREATED).send(post)
  }
)

router.delete("/:dbid/",
  requiresAuth,
  checkSchema(post_delete, ["params"]),
  inputValidator,
  async (req, res) => {
    const post = await getPost(req.params.dbid)
    
    if(req.user.dbid != post.author.dbid) return res.status(HttpStatusCode.FORBIDDEN).send(generateJSONError({ msg: "ERR_POST_OWNERSHIP", path: "uid" }, HttpStatusCode.FORBIDDEN))
    
    const action = await deletePost(post.dbid)
    
    if(action){
      return res.sendStatus(HttpStatusCode.OK)
    } else {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(generateJSONError({ msg: "ERR_UNEXPECTED", path: "" }, HttpStatusCode.INTERNAL_SERVER_ERROR))
    }
})

module.exports = router

// TODO Setup Likes