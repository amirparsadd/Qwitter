import { PostActions } from "../../models/types/PostAction";

interface IPostActionResult {
  authorID: string,
  postID: string,
  action: PostActions
}