import { FaArrowRight } from "react-icons/fa6"
import "./style.css"
import Qweet from "../../components/Qweet"
import { useState } from "react"

type Props = {}

function Main({}: Props) {
  const [ posts, setPosts] = useState([
    {
      creator: "mamadpro",
      uploadDate: 1721488480000,
      content: "loremipsum dige nadarim dasti ye gohi mitaypam"
    },
    {
      creator: "mamadpro",
      uploadDate: 1721488480000,
      content: "loremipsum dige nadarim dasti ye gohi mitaypam"
    }
  ])

  return (
    <div className='w-dvw'>
      <div className="flex flex-row flex-wrap">
        {
          posts.reverse().map((val) => {
            return <Qweet {...val} />
          })
        }
      </div>
      <div className="fixed bottom-0 flex items-center gap-1 w-screen">
        <span>UserName</span>

        <div className="flex w-full">
          <input className="w-full" type="text" placeholder="Qweet Something..." />
          <button className="m-2 px-5 inline-block flex-1" type="submit">
            <FaArrowRight/>
            Qweet
          </button>
        </div>
      </div>
    </div>
  )
}

export default Main