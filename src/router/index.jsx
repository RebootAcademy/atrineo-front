import { createBrowserRouter } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import Home from "../pages/Home"
import Statistics from "../pages/Statistics"
import Dataset from "../pages/Dataset"
import Login from "../pages/Login/Login"
import Layout from "../Layout/Layout"

const isAuthenticated = () => {
  return !!localStorage.getItem('token')
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
        element: isAuthenticated() ? <Home /> : <Navigate to="/" replace />
      },
      {
        path: '/statistics',
        element: isAuthenticated() ? <Statistics /> : <Navigate to="/" replace />
      },
      {
        path: '/dataset',
        element: isAuthenticated() ? <Dataset /> : <Navigate to="/" replace />
      }
    ]
  }
])
