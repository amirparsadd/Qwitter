const bcrypt = require("bcrypt")

const SALT_ROUNDS = 10

function hashPassword(password){
  const salt = bcrypt.genSaltSync(SALT_ROUNDS)
  
  return bcrypt.hashSync(password, salt)
}

function comparePasswords(unhashedPassword, password){
  return bcrypt.compareSync(unhashedPassword, password)
}

module.exports = {
  hashPassword,
 
  comparePasswords
}