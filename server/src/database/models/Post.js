const { Schema, model, Types } = require("mongoose")

function randomUUID(){
  return crypto.randomUUID()
}

const PostSchema = new Schema({
  uid: {
    type: String,
    default: randomUUID,
    unique: true
  },
  author: {
    type: Types.ObjectId,
    ref: "User",
    required: true
  },
  actions: {
    likes: {
      type: Types.ObjectId,
      ref: "PostAction",
      default: 0
    },
    dislikes: {
      type: Types.ObjectId,
      ref: "PostAction",
      default: 0
    },
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
