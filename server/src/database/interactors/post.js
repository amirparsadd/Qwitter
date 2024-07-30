const { Types } = require("mongoose")
const Post = require("../models/Post")
const { getUserById } = require("./user")

cache = {}

async function convert(post){
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
    content: post.content
  }
}

/**
 * 
 * @param {Array} postArray 
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

async function getLatestPosts(range = [0 , 50]){
  try {
    // const startTime = Date.now()
    const result = await Post.find({}).sort({_id: -1}).skip(range[0]).limit(range[1]) // Thanks To My Bro MongoDB AI
    // console.log(Date.now() - startTime)
    return convertArray(result)
  } catch (err) {
    throw err
  }
}

module.exports = {
  createPost,
  getLatestPosts
}