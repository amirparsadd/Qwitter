// STATICS
const LOGGER_NAME = "DB Connection Init"
// STATICS

// IMPORTS
const mongoose = require("mongoose")
const { log } = require("../utils/logger")
// IMPORTS

module.exports = async () => {
  const { MONGODB_URI } = process.env

  try {
    await mongoose.connect(MONGODB_URI)
  } catch (err) {
    log(LOGGER_NAME, "🔴 Connection To DB Failed!")
    console.error(err)

    process.exit(1)
  }

  log(LOGGER_NAME, "🍀 Connection To DB Successful!")
}