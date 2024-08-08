import { Types } from "mongoose";

interface IPost {
  author: Types.ObjectId,
  actions: {
    likes: Array<Types.ObjectId>,
    dislikes: Array<Types.ObjectId>
  },
  creationDate: number,
  content: string
}