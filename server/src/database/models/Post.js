const { Schema, model, Types } = require("mongoose")

const autoIncrement = require("mongoose-id-autoincrement")

const PostSchema = new Schema({
  uid: {
    type: Number,
    required: true,
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


function init(){
  PostSchema.plugin(autoIncrement.plugin,  {model: 'Post', field: 'uid', unique: true});
  module.exports = model("Post", PostSchema)
}

module.exports = init
