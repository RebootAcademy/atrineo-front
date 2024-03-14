import { createBrowserRouter, redirect } from 'react-router-dom'
import Home from "../pages/Home"
import Statistics from "../pages/Statistics"
import Dataset from "../pages/Dataset"
import Login from "../pages/Login"
import ContactUs from '../pages/ContactUs'
import AdminProfile from '@/pages/AdminProfile'
import UserManagement from '@/pages/UserManagement'
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
        path: '/contactus',
        element: <ContactUs />
      },
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
      },
      {
        path: '/adminProfile',
        element: <AdminProfile/>,
        loader: authLoader
      },
      {
        path: '/userManagement',
        element: <UserManagement />,
        loader: authLoader
      }
    ]
  }
])

//dejar aquí por si acaso falla el login, ponemos este codigo y podemos acceder a map, statistics y dataset :)
/*export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/map',
        element: <Home />
      },
      {
        path: '/statistics',
        element: <Statistics />
      },
      {
        path: '/dataset',
        element: <Dataset />
      }
    ]
  }
])*/
