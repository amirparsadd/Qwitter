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
const { getPost } = require("../../../database/interactors/post")
const { createAction, removeAction, isActionFound } = require("../../../database/interactors/postAction")
//IMPORTS

// FIXME Find A More Scalable System
const ACTIONS = [ "LIKE", "DISLIKE" ]

const router = Router()
log(LOGGER_NAME, "🌐 Router Is Up")

router.post("/",
  requiresAuth,
  checkSchema(post_action_global, [ "body" ]),
  inputValidator,
  /**
   * 
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   */
  async ( req, res ) => {
    try {
      const { dbid, action } = req.body
      const userID = req.user.dbid

      const post = await getPost(dbid)

      if(!post){
        return res.status(HttpStatusCode.NOT_FOUND).send(generateJSONError({ msg: "ERR_POST_NOTFOUND", path: "dbid" }, HttpStatusCode.NOT_FOUND))
      }

      if(!ACTIONS.includes(action)){
        return res.status(HttpStatusCode.BAD_REQUEST).send(generateJSONError({ msg: "ERR_ACTION_NOTFOUND", path: "action" }, HttpStatusCode.BAD_REQUEST))
      }

      const actionSearchResult = await isActionFound(userID, post.dbid, action)

      if(actionSearchResult === null) throw new Error()

      if(actionSearchResult === true){
        return res.status(HttpStatusCode.BAD_REQUEST).send(generateJSONError({ msg: "ERR_ACTION_FOUND", path: "" }, HttpStatusCode.BAD_REQUEST))
      }

      const actionResult = createAction(userID, post.dbid, action)

      if(!actionResult) throw new Error()

      return res.sendStatus(HttpStatusCode.CREATED)  
    } catch (err) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(generateJSONError({ msg: "ERR_UNEXPECTED", path: "" }, HttpStatusCode.INTERNAL_SERVER_ERROR))
    }
    
})

router.delete("/",
  requiresAuth,
  checkSchema(post_action_global, [ "body" ]),
  inputValidator,
  async ( req, res ) => {
    // Delete An Action
})

module.exports = router