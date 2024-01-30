import { createBrowserRouter, redirect } from "react-router-dom"

import Home from "../pages/Home"
import Login from "../pages/Login"

const isAuthenticated = () => {
  if (!localStorage.getItem("token")) {
    return redirect("/access")
  } else {
    return null;
  }
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  { 
    path: '/login', 
    element: <Login />
    //loader: isAuthenticated
  },
])