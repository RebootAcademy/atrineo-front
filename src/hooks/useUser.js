import { useContext } from "react"
import { useQuery } from "react-query"
import { useNavigate } from "react-router-dom"

import { UserContext } from '../context/userContext'

import { getOwnProfile } from "@/services/userService"

export const useUser = () => {
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)

  return useQuery("profile", getOwnProfile, {
    enabled: !!user && !user.name,
    onSuccess: (data) => {
      if (data && data.result) {
        setUser(data.result)
      }
    },
    onError: () => {
      localStorage.removeItem("token")
      navigate("/")
    }
  })
} 