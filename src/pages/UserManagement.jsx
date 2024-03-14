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
    <>
      <div className="border">User Management</div>
      <div className="bg-slate-200 w-full h-screen flex flex-col justify-center">
        <div className="bg-slate-50 border">
          {users.map((userData, index) => (
            <div key={index} className="border">
              <div>
                <h2>{userData.name}</h2>
                <p>Email: {userData.email}</p>
                <p>Role: {userData.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default UserManagement