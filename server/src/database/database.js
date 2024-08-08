// STATICS
const LOGGER_NAME = "DB Connection Init"
// STATICS

// IMPORTS
const mongoose = require("mongoose")
const { log } = require("../utils/logger")
// IMPORTS

const init = async () => {
  const { MONGODB_URI } = process.env
  
  try {
    const db = await mongoose.connect(MONGODB_URI)
  } catch (err) {
    log(LOGGER_NAME, "🔴 Connection To DB Failed!")
    console.error(err)

    process.exit(1) // The Server Cannot Work Without A DB
  }

  log(LOGGER_NAME, "🍀 Connection To DB Successful!")
}

module.exports = init