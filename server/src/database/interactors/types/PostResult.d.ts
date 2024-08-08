interface IPostResult {
  dbid: string,
  author: IUserResult,
  actions: {
    likes: number,
    dislikes: number
  },
  creationDate: number,
  content: string
}