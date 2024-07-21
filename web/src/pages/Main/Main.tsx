import { FaArrowRight } from "react-icons/fa6"
import "./style.css"
import Qweet from "../../components/Qweet"
import { useEffect, useState } from "react"

type Props = {}

type a = {
  author: string,
  creationDate: number,
  content: string
}

function Main({}: Props) {
  const [ posts, setPosts]: [Array<a>, Function] = useState([])

  useEffect(() => {
    fetch("http://localhost:8080/api/posts/0").then((res) => console.log(res.json().then((result) => {
      setPosts(result)
    })))
  }, [])

  return (
    <div className='w-dvw'>
      <div className="flex flex-row flex-wrap">
        {
          posts.reverse().map((val) => {
            return <Qweet creator={val.author} uploadDate={val.creationDate} content={val.content} />
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