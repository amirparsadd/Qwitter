import prettyMilliseconds from "pretty-ms"
import { FaThumbsDown, FaThumbsUp, FaTrashCan } from "react-icons/fa6"

type Props = {
  uploadDate: number,
  creator: string,
  content: string,
  currentUser: string // The Current Viewing User's Username
}

function Qweet({ uploadDate, creator, content, currentUser }: Props) {
  return (
    <div className='bg-[#3b3b3b] w-[45vw] rounded-md p-4 m-2'>
      <div className="flex justify-between">
        <div className="font-bold flex items-center gap-2">
          <span>
            {creator}
          </span>
          {
            currentUser == creator
              ?
                <div className=" cursor-pointer">
                  <FaTrashCan className="transition-all ease-in duration-300 text-red-400 hover:text-red-600"/>
                </div>
              :
                <div className="flex gap-1 items-center text-gray-300">
                  <FaThumbsUp className="text-blue-300 hover:text-blue-500 transition-all cursor-pointer"/>
                  <FaThumbsDown className="text-red-300 hover:text-red-500 transition-all cursor-pointer"/>
                </div>
          }
        </div>
        <span className="opacity-80 font-light text-sm">
          {prettyMilliseconds(Date.now() - uploadDate, { compact: true })} ago
        </span>
      </div>

      <p className="text-[11pt]">
        {content}  
      </p>
    </div>
  )
}

export default Qweet