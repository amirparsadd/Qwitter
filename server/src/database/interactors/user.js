const User = require("../models/User");

function convert(user){
  return {
    username: user.username
  }
}

async function createUser(username, password){
  try {
    const result = await User.create({username, password})
    return convert(result)
  } catch (err) {
    throw err
  }
}

async function getUserById(id){
  try {
    const result = await User.findById(id)
    return convert(result)
  }catch (err) {
    throw err
  }
}

module.exports = {
  createUser,
  getUserById
}