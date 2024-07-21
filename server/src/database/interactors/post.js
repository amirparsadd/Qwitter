const { Types } = require("mongoose")
const Post = require("../models/Post")

function convert(post){
  return {
    author: post.author,
    creationDate: post.creationDate,
    content: post.content
  }
}

/**
 * 
 * @param {Array} postArray 
 */
function convertArray(postArray){
  const result = []

  postArray.forEach(val => {
    result.push(convert(val))
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