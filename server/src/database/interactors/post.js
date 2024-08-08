const { Types } = require("mongoose")
const Post = require("../models/Post")
const { getUserById } = require("./user")

cache = {}

/**
 * 
 * @param {import("mongoose").HydratedDocument<import("../models/Post").IPost> | null} post 
 * @returns {import("./PostResult").IPostResult}
 */
async function convert(post){
  if(post === null || post === undefined) return null

  let author;
  if(cache[post.author]) {
    author = cache[post.author]
  }else {
    author = await getUserById(post.author)
    cache[post.author] = author
  }

  return {
    author,
    uid: post.uid,
    creationDate: post.creationDate,
    actions: {
      likes: post.actions.likes.length,
      dislikes: post.actions.dislikes.length
    },
    content: post.content,
    delete: () => deletePostByUID(post.uid)
  }
}

/**
 * 
 * @param {Array<import("mongoose").HydratedDocument<import("../models/Post").IPost>>} postArray
 * @returns {Array<IPostResult>} 
 */
async function convertArray(postArray){
  const result = []

  postArray.forEach( async (val) => {
    result.push( await convert(val) )
  })

  return result
}

/**
 * 
 * @param {Types.ObjectId} userID
 * @param {String} content 
 */
async function createPost(userID, content){
  try {
    const result = await Post.create({author: userID, creationDate: Date.now(), content})
    return convert(result)
  } catch (err) {
    throw err
  }
}

/**
 * 
 * @param {Array<Number>} range 
 * @returns {Array<import("./PostResult").IPostResult>}
 */
async function getLatestPosts(range = [0 , 50]){
  try {
    const result = await Post.find({}).sort({_id: -1}).skip(range[0]).limit(range[1]) // Thanks To My Bro MongoDB AI
    return convertArray(result)
  } catch (err) {
    throw err
  }
}

/**
 * 
 * @param {import("./PostResult").IPostResult} uid 
 * @returns 
 */
async function getPostByUID(uid){
  const result = await Post.findOne({ uid })

  return convert(result)
}

async function deletePostByUID(uid){
  try {
    await Post.findOneAndDelete({ uid })
    return true
  } catch (err) {
    return false
  }
}

module.exports = {
  createPost,
  getLatestPosts,
  getPostByUID,
  deletePostByUID
}