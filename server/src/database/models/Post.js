const { Schema, model, Types } = require("mongoose")

function randomUUID(){
  return crypto.randomUUID()
}

const PostSchema = new Schema({
  author: {
    type: Types.ObjectId,
    ref: "User",
    required: true
  },
  actions: {
    likes: {
      type: [Types.ObjectId],
      ref: "PostAction",
      default: []
    },
    dislikes: {
      type: [Types.ObjectId],
      ref: "PostAction",
      default: []
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
