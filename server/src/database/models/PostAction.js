const { Schema, model, Types } = require("mongoose")

const PostActionSchema = new Schema({
  authorID: {
    type: Types.ObjectId,
    ref: "User",
    required: true
  },
  postID: {
    type: Types.ObjectId,
    ref: "Post",
    required: true
  },
  action: {
    type: String,
    required: true
  }
})

module.exports = model("PostAction", PostActionSchema)