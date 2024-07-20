const User = require("../models/User");

function convert(user, full = false){
  if(full){
    return {
      dbid: user._id,
      username: user.username,
      password: user.password
    }
  }else {
    return {
      dbid: user._id,
      username: user.username
    }
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

async function getUserByUsername(username, full = false){
  const result = await User.findOne({username})
  
  if(!result){
    throw new Error("ERR_DB_NOTFOUND")
  }

  return convert(result, full)
}

module.exports = {
  createUser,
  getUserById,
  getUserByUsername
}