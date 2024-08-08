const { Types } = require("mongoose")
const Post = require("../models/Post")
const { getUserById } = require("./user")

cache = {}

/**
 * Converts A MongoDB Document To A Universally Usable Object (So If We Want To Switch DBs We Dont Have To Melt Our Brains Off)
 * 
 * @param {import("mongoose").HydratedDocument<import("../models/types/Post").IPost> | null} post 
 * @returns {import("./types/PostResult").IPostResult}
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
    dbid: post._id.toString(),
    creationDate: post.creationDate,
    actions: {
      likes: post.actions.likes.length,
      dislikes: post.actions.dislikes.length
    },
    content: post.content
  }
}

/**
 * Converts A MongoDB Document Array To A Universally Usable Object Array (So If We Want To Switch DBs We Dont Have To Melt Our Brains Off)
 * 
 * @param {Array<import("mongoose").HydratedDocument<import("../models/types/Post").IPost>>} postArray
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
 * @returns {Array<import("./types/PostResult").IPostResult>}
 */
async function getLatestPosts(range = [0 , 50]){
  const START = 0
  const END = 1
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
    const result = await Post.find({}).sort({_id: -1}).skip(range[START]).limit(range[END]) // Thanks To My Bro MongoDB AI
    return convertArray(result)
  } catch (err) {
    throw err
  }
}

/**
 * Gets A Post
 * 
 * @param {String} dbid 
 * @returns {IPostResult}
 */
async function getPost(dbid){
  const result = await Post.findById(dbid)

  return convert(result)
}

/**
 * Deletes A Post
 * 
 * @param {String} dbid 
 * @returns {Boolean}
 */
async function deletePost(dbid){
  try {
    await Post.findByIdAndDelete(dbid)
    return true
  } catch (err) {
    return false
  }
}

module.exports = {
  createPost,
  getLatestPosts,
  getPost,
  deletePost
}