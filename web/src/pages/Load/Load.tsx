
import { FaSpinner } from "react-icons/fa6"
import "./style.css"
import { useEffect } from "react"
import { checkAuthStatus } from "../../interactor/auth"

type Props = {}

function Login({}: Props) {
  useEffect(() => {
    async function wrapper() {
      const authStatus = await checkAuthStatus()

      // Delay it a bit to make it seem more real
      setTimeout(() => {
        if(!authStatus){
          window.location.pathname = "/auth"
        }else{
          window.location.pathname = "/home"
        }
      }, 1000)
    }    

    // Needed for async functions
    wrapper()
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