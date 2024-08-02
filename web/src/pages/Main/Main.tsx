import { FaArrowRight, FaArrowsRotate } from "react-icons/fa6"
import "./style.css"
import Qweet from "../../components/Qweet"
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react"
import { createPost, getPosts } from "../../interactor/posts"
import { getAuthData } from "../../interactor/auth"

type Props = {}

type Author = {
  dbid: string,
  username: string
}

type Post = {
  author: Author,
  creationDate: number,
  content: string,
  uid: string
}

function Main({}: Props) {
  const [ posts, setPosts] = useState<Array<Array<Post>>>([])
  const [ batch, setBatch ] = useState(0)
  const [ endOfPosts, setEndOfPosts ] = useState(false)
  const [ username, setUsername ] = useState("loading")

  const [ formInput, setFormInput ] = useState("")
  const [ formEnabled, setFormEnabled ] = useState(true)

  const joinedPosts = useMemo(() => {
    let result: Array<Post> = []
    posts.forEach(chunk => {
      result = [...result, ...chunk]
    })

    console.log(result)

    return result
  }, [ posts ])

  function formInputBind(stateSetter: Function){
    return function(e: ChangeEvent<HTMLInputElement>){
      stateSetter(e.target.value)
    }
  }

  async function formSubmit(e: FormEvent<HTMLFormElement>){
    e.preventDefault()
    setFormEnabled(false)

    const result = await createPost(formInput)

    if(result){
      window.location.reload()
    }else {
      window.alert("An Error Occured!")
    }
  }

  //* Auth Related
  useEffect(() => {
    async function wrapper() {
      const data = await getAuthData()
      if(!data) window.location.pathname = "/"
      
      setUsername(data.username)
    }
    
    wrapper()
  }, [])
  
  //* Post Loading
  useEffect(() => {
    async function wrapper(){
      const posts = await getPosts(batch)

      if(posts.length === 0){
        window.alert("No New Content Found")
        setEndOfPosts(true)
      }

      setPosts(current => {
        return [...current, posts]
      })
    }

    wrapper()
  }, [ batch ])

  return (
    <div className='w-[95dvw] flex flex-col'>
      <div className="flex flex-row flex-wrap">
        {
          posts
          ? joinedPosts.map((val) => {
              console.log(val)
              return <Qweet key={val.uid} currentUser={username} creator={val.author.username} uploadDate={val.creationDate} content={val.content || "Failed To Load"} />
            })
          : "An Error Occured While Loading Posts"
        }
      </div>
      <div className="flex justify-center mt-2 mb-[50dvh]">
        <div
          onClick={() => {
            if(endOfPosts) return
            setBatch(batch + 1)
          }}
          className={`bg-gray-500 p-2 rounded-full ${endOfPosts ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}>
          <FaArrowsRotate/>
        </div>
      </div>
      <div className="fixed bottom-0 flex items-center gap-1 w-full">
        <span className="select-none">{username}</span>
        <form onSubmit={formSubmit} className="flex w-full">
          <input
            onChange={formInputBind(setFormInput)} value={formInput}
            className="w-[70dvw]" type="text" placeholder="Qweet Something..."
            minLength={10} maxLength={500} required={true}/>
          <button
            className="m-2 flex-1" type="submit"
            disabled={!formEnabled}>
              <FaArrowRight/>
              Qweet
          </button>
        </form>
      </div>
    </div>
  )
}

export default Main