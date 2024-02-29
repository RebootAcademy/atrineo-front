import { createBrowserRouter, redirect } from 'react-router-dom'

import Home from "../pages/Home"
import Statistics from "../pages/Statistics"
import Dataset from "../pages/Dataset"
import Login from "../pages/Login"
import Layout from "../Layout/Layout"

const isAuthenticated = () => {
  if (!localStorage.getItem('token')) {
    return redirect('/login')
  } else {
    return null
  }
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/statistics',
        element: <Statistics />
      },
      {
        path: '/dataset',
        element: <Dataset />
      },
      {
        path: '/login',
        element: <Login />
        // loader: isAuthenticated
      }
    ]
  }
])
