import { Types } from "mongoose";

enum PostActions {
  LIKE = "LIKE",
  DISLIKE = "DISLIKE"
}

interface IPostAction {
  authorID: Types.ObjectId,
  postID: Types.ObjectId,
  action: string
}