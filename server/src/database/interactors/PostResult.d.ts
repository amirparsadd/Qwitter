import { Types } from "mongoose";

interface IPostResult {
  uid: string,
  author: IUserResult,
  actions: {
    likes: number,
    dislikes: number
  },
  creationDate: number,
  content: string
}