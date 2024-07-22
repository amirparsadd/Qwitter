
import { FaSpinner } from "react-icons/fa6"
import "./style.css"
import { useEffect } from "react"

type Props = {}

function Login({}: Props) {

  useEffect(() => {

  }, [])

  return (
    <div className='w-dvw h-dvh flex flex-col items-center gap-2 justify-center'>
      <FaSpinner className="animate-spin" size={24}/>
      <span>
        Loading
      </span>
    </div>
  )
}

export default Login