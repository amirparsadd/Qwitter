const { Schema, model, Types } = require("mongoose")

const PostSchema = new Schema({
  uid: {
    type: String,
    default: crypto.randomUUID(),
    unique: true
  },
  author: {
    type: Types.ObjectId,
    ref: "User",
    required: true
  },
  creationDate: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true
  }
})

module.exports = model("Post", PostSchema)
