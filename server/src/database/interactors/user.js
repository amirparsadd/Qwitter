const User = require("../models/User")

/**
 * Converts A MongoDB Document To A Universally Usable Object (So If We Want To Switch DBs We Dont Have To Melt Our Brains Off)
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
 * Creates A User
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
 * Gets A User By Their ID (MONGODB OBJECTID)
 * 
 * @param {String} id
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
 * Gets A User By Their Username
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