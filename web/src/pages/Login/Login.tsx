import { FaDoorOpen } from "react-icons/fa6"
import LegalLink from "../../components/LegalLink"

import "./style.css"

type Props = {}

function Login({}: Props) {

  return (
    <div className='w-dvw h-dvh flex flex-col items-center justify-center'>
      <div className="shadow-lg bg-[#3b3b3b] p-5 rounded-xl">
        <div className="pb-3 flex flex-col items-center">
          <h1 className="font-semibold">Login / Signup</h1>
          <h2 className="font-light text-[11pt]">Enter The World Of Qwitter</h2>
        </div>

        <form className="flex flex-col items-center" action="localhost:8080/api/auth" method="post">
          <input required={true} minLength={3} maxLength={16} type="text" placeholder="Username" />
          <input required={true} minLength={6} maxLength={20} type="password" placeholder="Password" />
          <button type="submit">
            <FaDoorOpen size={24}/>
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