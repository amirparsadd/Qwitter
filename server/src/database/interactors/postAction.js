const { Types } = require("mongoose")
const PostAction = require("../models/PostAction")
const Post = require("../models/Post")

/**
 * 
 * @param {import("mongoose").HydratedDocument<import("../models/types/PostAction").IPostAction>} actionDocument
 * @returns {import("./types/PostActionResult").IPostActionResult}
 */
function convert(actionDocument){
  return {
    authorID: actionDocument.authorID.toString(),
    postID: actionDocument.postID.toString(),
    action: actionDocument.action,
  }
}

/**
 * 
 * @param {String} userID 
 * @param {String} postID 
 * @param {import("../models/types/PostAction").PostActions} action 
 */
async function createAction(userID, postID, action){
  try{
    /**
     * @type {import("mongoose").HydratedDocument<import("../models/types/Post").IPost>}
     */
    const post = await Post.findById(postID)

    const result = await PostAction.create({ authorID: Types.ObjectId(userID), postID: Types.ObjectId(postID), action })

    switch (action) {
      case "LIKE":
        post.actions.likes.push(result)
        break
      case "DISLIKE":
        post.actions.dislikes.push(result)
        break
    }

    return convert(result)
  } catch (err){
    return null
  }
}

/**
 * 
 * @param {String} userID 
 * @param {String} postID 
 * @param {import("../models/PostAction").PostActions} action 
 */
function removeAction(userID, postID, action){
  // TODO Impl
}

module.exports = {
  createAction,
  removeAction
}