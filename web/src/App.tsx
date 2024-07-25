import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./pages/Login"
import Main from "./pages/Main"
import Load from "./pages/Load"

import "react-responsive-modal/styles.css"
import "./additional-modal-styling.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Load/>,
    errorElement: <p>An Error Occured!</p>
  },
  {
    path: "/home",
    element: <Main/>,
    errorElement: <p>An Error Occured!</p>
  },
  {
    path: "/auth",
    element: <Login/>,
    errorElement: <p>An Error Occured!</p>
  }
])

function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
