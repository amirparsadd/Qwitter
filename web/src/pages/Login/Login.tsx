import { FaDoorOpen, FaSpinner } from "react-icons/fa6"
import LegalLink from "../../components/LegalLink"

import "./style.css"
import { ChangeEvent, FormEvent, useState } from "react"
import { authenticate } from "../../interactor/auth"
import { Modal } from 'react-responsive-modal'

type Props = {}

function Login({}: Props) {
  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ formEnabled, setFormEnabled ] = useState(true)

  const [ modalState, setModalState ] = useState(false)
  const [ modalContentState, setModalContentState ] = useState("SUCCESS")
  const [ modalResult, setModalResult ] = useState({status: "OK", message: "SUCCESS"})

  function formInputBind(stateSetter: Function){
    return function(e: ChangeEvent<HTMLInputElement>){
      stateSetter(e.target.value)
    }
  }

  async function submitForm(e: FormEvent<HTMLFormElement>){
    e.preventDefault()
    setFormEnabled(false)

    const results = await authenticate(username, password)

    if(results){
      if(typeof results == "boolean"){
        setModalContentState("SUCCESS")
        setModalState(true)
      }
    }else{
      setModalContentState("Unexpected")
      setModalResult({ status: "Unexpected", message: "An Unexpected Error Occured!\nCheck Your Connection"})
      setModalState(true)
    }
  }

  return (
    <div className='w-dvw h-dvh flex flex-col items-center justify-center'>

      <Modal onClose={() => {setModalState(!modalState)}} open={modalState} center>
        <h1>
          {
            modalContentState == "SUCCESS"
              ? "Success"
              : `Error - ${modalResult.status}`
          }
        </h1>
        <h2>
          {
            modalResult.message == "SUCCESS"
              ? "Login Successful"
              : modalResult.message
          }
        </h2>
      </Modal>

      <div className="shadow-lg bg-[#3b3b3b] p-5 rounded-xl">
        <div className="pb-3 flex flex-col items-center">
          <h1 className="font-semibold">Login / Signup</h1>
          <h2 className="font-light text-[11pt]">Enter The World Of Qwitter</h2>
        </div>

        <form onSubmit={submitForm} className="flex flex-col items-center">
          <input disabled={!formEnabled} onChange={formInputBind(setUsername)} value={username} required={true} minLength={3} maxLength={16} type="text" placeholder="Username" />
          <input disabled={!formEnabled} onChange={formInputBind(setPassword)} value={password} required={true} minLength={6} maxLength={20} type="password" placeholder="Password" />
          <button disabled={!formEnabled} type="submit">
            {
              formEnabled
                ? (<FaDoorOpen size={24}/>)
                : (<FaSpinner className="animate-spin" size={24}/>)
            }
            <span>Submit</span>
          </button>
        </form>
      </div>
      <div className="flex flex-col items-center">
        <div>
          <LegalLink text="Terms Of Service" link="#tos"/>
          <LegalLink text="Privacy Policy" link="#privacy"/>
        </div>
        <span className="font-light text-[10pt]">
          &copy; Amirparsa Baghdadi
        </span>
      </div>
    </div>
  )
}

export default Login