import { Types } from "mongoose";

interface IPostAction {
  authorID: Types.ObjectId,
  postID: Types.ObjectId,
  action: PostActions
}