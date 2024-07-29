import { FaArrowRight } from "react-icons/fa6"
import "./style.css"
import Qweet from "../../components/Qweet"
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react"
import { createPost, getPosts } from "../../interactor/posts"
import { getAuthData } from "../../interactor/auth"

type Props = {}

interface KV_String_String {
  [key: string]: string
}

type Post = {
  author: string,
  creationDate: number,
  content: string
}

let usernameCache: KV_String_String = {}

function Main({}: Props) {
  const [ posts, setPosts] = useState<Array<Array<Post>>>([])
  const [ batch, setBatch ] = useState(0)
  const [ username, setUsername ] = useState("loading")

  const [ formInput, setFormInput ] = useState("")
  const [ formEnabled, setFormEnabled ] = useState(true)

  const joinedPosts = useMemo(() => {
    let result: Array<Post> = []
    posts.forEach(chunk => {
      chunk.map(async (post) => {
        post.author = "FIXME" // FIXME Get Username From Server Or Make The Server Send It
      })
      result = [...result, ...chunk]
    })

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
              return <Qweet creator={val.author} uploadDate={val.creationDate} content={val.content} />
            })
          : "An Error Occured While Loading Posts"
        }
      </div>
      <div className="fixed bottom-0 flex items-center gap-1 w-full">
        <span>{username}</span>
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