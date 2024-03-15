import EditInfoModalComponent from "@/components/EditInfoModalComponent/EditInfoModalComponent"
import { Card } from "@/components/ui/Card/Card"
// import { UserContext } from "@/context/userContext"
import { getAllUsers/* , getOneUser */ } from "@/services/userService"
import { /* useContext, */ useState } from "react"
import { useQuery } from "react-query"

function UserManagement() {
  // const { user: userContext, setUser: setUserContext } = useContext(UserContext)
  const [users, setUsers] = useState([])

  useQuery('user', getAllUsers, {
    onSuccess: (data) => {
      if (data && data.result && Array.isArray(data.result)) {
        // setUserContext(data.result)
        setUsers(data.result)
      }
    }
  })

  // useQuery('user', getOneUser, {
  //   enabled: !!userContext && !userContext.name,
  //   onSuccess: (data) => {
  //     if (data && data.result && Array.isArray(data.result)) {
  //       setUserContext(data.result)
  //       setUsers(data.result)
  //     }
  //   }
  // })

  return (
    <>
      <div className="bg-slate-200 w-full h-screen flex justify-center">
        <div className="flex flex-col">
          {users.map((userData, index) => (
            <>
              <div key={index}>
                <Card className="border mt-6 relative w-96 p-4 bg-slate-50">
                  <div className="absolute top-0 right-0">
                    <EditInfoModalComponent userData={userData} />
                  </div>
                  <div>
                    <p>{userData.name}</p>
                    <p>Email: {userData.email}</p>
                    <p>Role: {userData.role}</p>
                  </div>
                </Card>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  )
}

export default UserManagement