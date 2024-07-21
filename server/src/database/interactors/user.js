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
    const result = await  User.create({username: username, password: password})

    return convert(result)
  } catch (err) {
    throw err
  }
}

async function getUserById(id, full = false, errors = true){
  try {
    const result = await User.findById(id)
    
    if(!result){
      if(errors){
        throw new Error("ERR_DB_NOTFOUND")
      }else{
        return null
      }
    }
  
    return convert(result, full)
  }catch (err) {
    throw err
  }
}

async function getUserByUsername(username, full = false, errors = true){
  const result = await User.findOne({username})
  
  if(!result){
    if(errors){
      throw new Error("ERR_DB_NOTFOUND")
    }else{
      return null
    }
  }

  return convert(result, full)
}

module.exports = {
  createUser,
  getUserById,
  getUserByUsername
}