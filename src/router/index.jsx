import { createBrowserRouter, redirect } from "react-router-dom"

import Home from "../pages/Home"
import Login from "../pages/Login"
import Layout from "../Layout/Layout"

const isAuthenticated = () => {
  if (!localStorage.getItem("token")) {
    return redirect("/access")
  } else {
    return null;
  }
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />
        //loader: isAuthenticated
      }
    ]
  }
])