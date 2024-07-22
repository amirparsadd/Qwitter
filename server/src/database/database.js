// STATICS
const LOGGER_NAME = "DB Connection Init"
// STATICS

// IMPORTS
const mongoose = require("mongoose")
const { log } = require("../utils/logger")
const autoIncrement = require("mongoose-id-autoincrement")
const Post = require("./models/Post")
// IMPORTS

let db;


module.exports = async () => {
  const { MONGODB_URI } = process.env
  
  try {
    const db = await mongoose.connect(MONGODB_URI)
    autoIncrement.initialize(db);

    Post()
  } catch (err) {
    log(LOGGER_NAME, "🔴 Connection To DB Failed!")
    console.error(err)

    process.exit(1)
  }

  log(LOGGER_NAME, "🍀 Connection To DB Successful!")
}