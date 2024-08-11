const { Types } = require("mongoose")
const PostAction = require("../models/PostAction")
const Post = require("../models/Post")

// TODO Make an isActionFound Function To Prevent Multiple Likes By One User

/**
 * Returns True If The Action Was Found And False Otherwise
 * Returns Null If Anything Unexpected Happened
 * 
 * @param {String} userID 
 * @param {String} postID 
 * @param {String} action 
 */
async function isActionFound(userID, postID, action){
  try {
    const result = await PostAction.findOne({authorID: userID, postID, action})

    return result ? true : false

  } catch (err) {
    return null
  }
}

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
 * Create A New Action On The Post
 * 
 * @param {String} userID 
 * @param {String} postID 
 * @param {String} action 
 */
async function createAction(userID, postID, action){
  try{
    /**
     * @type {import("mongoose").HydratedDocument<import("../models/types/Post").IPost>}
     */
    const post = await Post.findById(postID)
    
    const result = await PostAction.create({ authorID: new Types.ObjectId(userID), postID: new Types.ObjectId(postID), action })
    
    switch (action) {
      case "LIKE":
        post.actions.likes.push(result._id)
        break
      case "DISLIKE":
        post.actions.dislikes.push(result._id)
        break
      default:
        return null
    }

    post.save()

    return convert(result)
  } catch (err){
    return null
  }
}

/**
 * Remove An Action From A Post
 * returns true on success and false otherwise
 * 
 * @param {String} userID 
 * @param {String} postID 
 * @param {String} action 
 */
async function removeAction(userID, postID, action){
  try{
    const post = await Post.findById(postID)
    const deletedAction = await PostAction.findOneAndDelete(
      {
        authorID: Types.ObjectId(userID),
        postID,
        action
      })
    
    switch (action){
      case "LIKE":
        post.actions.likes.splice(post.actions.likes.indexOf(deletedAction._id), 1)
        break 
      case "DISLIKE":
        post.actions.dislikes.splice(post.actions.dislikes.indexOf(deletedAction._id), 1)
        break
      default:
        return false
    }

    post.save()
    return true
    
  }catch(err){
    return false
  }
}

module.exports = {
  createAction,
  removeAction,
  isActionFound
}