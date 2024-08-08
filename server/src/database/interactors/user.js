const User = require("../models/User")

/**
 *
 * @param {import("mongoose").HydratedDocument<IUser>} user 
 * @param {Boolean} full 
 * @returns {IUserResult}
 */
function convert(user, full = false){
  if(full){
    return {
      dbid: user._id.toString(),
      username: user.username,
      password: user.password
    }
  }else {
    return {
      dbid: user._id.toString(),
      username: user.username
    }
  }
}

/**
 * 
 * @param {String} username 
 * @param {String} password
 * @returns {IUserResult}
 */
async function createUser(username, password){
  try {
    const result = await  User.create({username: username, password: password})

    return convert(result)
  } catch (err) {
    throw err
  }
}

/**
 * 
 * @param {String} username 
 * @param {Boolean} full 
 * @param {Boolean} errors 
 * @returns {IUserResult}
 */
async function getUserById(id, full = false, errors = true){
  const result = await User.findById(id)
  
  if(!result){
    if(errors){
      throw new Error("ERR_DB_NOTFOUND")
    }else{
      return null
    }
  }

  return convert(result, full)
}

/**
 * 
 * @param {String} username 
 * @param {Boolean} full 
 * @param {Boolean} errors 
 * @returns {IUserResult}
 */
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