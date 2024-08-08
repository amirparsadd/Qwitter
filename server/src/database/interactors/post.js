const { Types } = require("mongoose")
const Post = require("../models/Post")
const { getUserById } = require("./user")
const { PostActions } = require("../models/PostAction")

cache = {}

/**
 * Converts A MongoDB Document To A Universally Usable Object (So If We Want To Switch DBs We Dont Have To Melt Our Brains Off)
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
 * Converts A MongoDB Document Array To A Universally Usable Object Array (So If We Want To Switch DBs We Dont Have To Melt Our Brains Off)
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
 * Creates A Post(Qweet)
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
 * Gets A Batch Of The Latest Posts
 * 
 * @param {Array<Number>} range 
 * @returns {Array<import("./PostResult").IPostResult>}
 */
async function getLatestPosts(range = [0 , 50]){
  /* TODO fix problems about getting repeated posts when a user on another client creates a post and then the current client requests a new batch

    Example:
      DB : P1, P2, P3, P4
      U1 Gets Chunk 1 : P4, P3
      U2 Posts: P5
      DB : P1, P2, P3, P4, P5
      U1 Gets Chunk 2 : P3, P2

      P3 Is Not Supposed To Be There

      Possible Fix: Add An Offset When Requesting a batch

  */
  try {
    const result = await Post.find({}).sort({_id: -1}).skip(range[0]).limit(range[1]) // Thanks To My Bro MongoDB AI
    return convertArray(result)
  } catch (err) {
    throw err
  }
}

/**
 * Gets A Post By A UID (NOT AN OBJECTID FROM MONGODB)
 * 
 * @param {String} uid 
 * @returns {IPostResult}
 */
async function getPostByUID(uid){
  const result = await Post.findOne({ uid })

  return convert(result)
}

/**
 * Deletes A Post By A UID (NOT AN OBJECTID FROM MONGODB)
 * 
 * @param {String} uid 
 * @returns {Boolean}
 */
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