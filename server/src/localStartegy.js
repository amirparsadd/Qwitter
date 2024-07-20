const passport = require("passport")
const { Strategy } = require("passport-local")
const { getUserByUsername } = require("./database/interactors/user")

module.exports = passport.use(
  new Strategy({}, async ( username, password, done ) => {
    try {
      const user = await getUserByUsername(username)

      if(!user) throw new Error("ERR_USER_NOTFOUND")
      if(user.password != password) throw new Error("ERR_PASSWORD_WRONG")
      
      done(null, user)
    } catch (err) {
      done(err, null)
    }
  })
)