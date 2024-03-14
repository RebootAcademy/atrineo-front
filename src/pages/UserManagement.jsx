import { UserContext } from "@/context/userContext"
import { getAllUsers } from "@/services/userService"
import { useContext, useState } from "react"
import { useQuery } from "react-query"

function UserManagement() {
  const { user: userContext, setUser: setUserContext } = useContext(UserContext)
  const [users, setUsers] = useState([])

  useQuery('user', getAllUsers, {
    enabled: !!userContext && !userContext.name,
    onSuccess: (data) => {
      if (data && data.result && Array.isArray(data.result)) {
        setUserContext(data.result)
        setUsers(data.result)
      }
    }
  })

  return (
    <div>
      <h1>User Management</h1>
      <div>
        {users.map((userData, index) => (
          <div key={index}>
            <h2>{userData.name}</h2>
            <p>Email: {userData.email}</p>
            <p>Role: {userData.role}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserManagement