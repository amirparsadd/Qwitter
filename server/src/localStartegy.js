const passport = require("passport")
const { Strategy } = require("passport-local")
const { getUserByUsername, getUserById } = require("./database/interactors/user")
const { compare } = require("bcrypt")
const { comparePasswords } = require("./utils/hashing")

passport.serializeUser(( user, done ) => {
  done(null, user.dbid.toString())
})

passport.deserializeUser(async ( id, done ) => {
  try {
    const user = await getUserById(id)
  
    if(!user){
      throw new Error("ERR_USER_NOTFOUND_AUTHED")
    }

    done(null, user)
  } catch (err) {
    done(err, null)
  }
})

module.exports = passport.use(
  new Strategy({}, async ( username, password, done ) => {
    try {
      const user = await getUserByUsername(username, true)
      
      if(!comparePasswords(password, user.password)) throw new Error("ERR_PASSWORD_WRONG")
      
      done(null, user)
    } catch (err) {
      done(err, null)
    }
  })
)