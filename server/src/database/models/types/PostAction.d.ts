import { Types } from "mongoose";

type PostActions = "LIKE" | "DISLIKE"

interface IPostAction {
  authorID: Types.ObjectId,
  postID: Types.ObjectId,
  action: PostActions
}