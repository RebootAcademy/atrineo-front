import { createBrowserRouter, redirect } from 'react-router-dom'
import Home from "../pages/Home"
import Statistics from "../pages/Statistics"
import Dataset from "../pages/Dataset"
import Login from "../pages/Login/Login"
import Layout from "../Layout/Layout"

const isAuthenticated = () => {
  return !!localStorage.getItem('token')
}

const authLoader = async () => {
  if (!isAuthenticated()) {
    return redirect("/")
  }
  return true
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/map',
        element: <Home />,
        loader: authLoader
      },
      {
        path: '/statistics',
        element: <Statistics />,
        loader: authLoader
      },
      {
        path: '/dataset',
        element: <Dataset />,
        loader: authLoader
      }
    ]
  }
])
