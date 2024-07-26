
import { FaSpinner } from "react-icons/fa6"
import "./style.css"
import { useEffect } from "react"
import { checkAuthStatus } from "../../interactor/auth"
import { redirect } from "react-router-dom"

type Props = {}

function Login({}: Props) {

  // function redirect(path){
  //   setTimeout(() => {
      // window.location.
  //   }, 1500)
  // }

  useEffect(() => {
    async function wrapper() {
      const authStatus = await checkAuthStatus()

      setTimeout(() => {
        if(!authStatus){
          window.location.pathname = "/auth"
        }else{
          window.location.pathname = "/home"
        }
      }, 1000)
    }    

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