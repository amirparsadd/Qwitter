const passport = require("passport")
const { Strategy } = require("passport-local")
const { getUserByUsername } = require("./database/interactors/user")

passport.serializeUser(( user, done ) => {
  done(null, user.username)
})

passport.deserializeUser(async ( id, done ) => {
  try {
    const user = await getUserByUsername(id)
  
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
      
      if(user.password != password) throw new Error("ERR_PASSWORD_WRONG")
      
      done(null, user)
    } catch (err) {
      done(err, null)
    }
  })
)