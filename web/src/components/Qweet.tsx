import prettyMilliseconds from "pretty-ms"
import { FaThumbsDown, FaThumbsUp, FaTrashCan } from "react-icons/fa6"
import { deletePost } from "../interactor/posts"
import { IPostActions } from "../pages/Main/Main"

type Props = {
  uploadDate: number,
  creator: string,
  content: string,
  currentUser: string, // The Current Viewing User's Username
  uid: string,
  actions: IPostActions
}

function Qweet({ uploadDate, creator, content, currentUser, uid, actions }: Props) {
  const likesDisplayNumber = actions.likes - actions.dislikes

  return (
    <div className='bg-[#3b3b3b] rounded-md p-4 m-2'>
      <div className="flex justify-between">
        <div className="font-bold flex items-center gap-2">
          <span>
            {creator}
          </span>
          {
            currentUser == creator
              ?
                <div onClick={async () => {
                  const result = await deletePost(uid)

                  if(result) return window.location.reload()
                  window.alert("An unexpected error occured!")
                }} className="cursor-pointer">
                  <FaTrashCan className="transition-all ease-in duration-300 text-red-400 hover:text-red-600"/>
                </div>
              :
                <div className="flex gap-1 items-center text-gray-300">
                  <FaThumbsUp className="text-blue-300 hover:text-blue-500 transition-all cursor-pointer"/>
                  <FaThumbsDown className="text-red-300 hover:text-red-500 transition-all cursor-pointer"/>
                </div>
          }
        </div>
        <div className="flex flex-row gap-2 items-center">
          <span className={`font-light text-sm ${likesDisplayNumber < 0 ? "text-red-500" : "text-green-300"}`}>
            {
              likesDisplayNumber < 0
              ? likesDisplayNumber
              : "+" + likesDisplayNumber
            }
          </span>

          <span className="opacity-80 font-light text-sm">
            {prettyMilliseconds(Date.now() - uploadDate, { compact: true })} ago
          </span>

        </div>
      </div>

      <p className="text-[11pt]">
        {content}  
      </p>
    </div>
  )
}

export default Qweet