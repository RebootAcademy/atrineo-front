import { Card } from "@/components/ui/Card/Card"
import { UserContext } from "@/context/userContext"
import { getAllUsers, getOneUser } from "@/services/userService"
import { useContext, useState } from "react"
import { useQuery } from "react-query"
import { EditIcon } from "@/components/ui/Icons/Icons"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/Dialog/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs/tabs"
import { Button } from "@/components/ui/Button/Button"
import { Label } from "@/components/ui/Label/Label"
import { Input } from "@/components/ui/Input/input"

function UserManagement() {
  const { user: userContext, setUser: setUserContext } = useContext(UserContext)
  const [users, setUsers] = useState([])
  const [selectedTab, setSelectedTab] = useState('user')
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleRepeatPasswordVisibility = () => {
    setShowRepeatPassword(!showRepeatPassword)
  }

  useQuery('user', getAllUsers, {
    enabled: !!userContext && !userContext.name,
    onSuccess: (data) => {
      if (data && data.result && Array.isArray(data.result)) {
        setUserContext(data.result)
        setUsers(data.result)
      }
    }
  })

  useQuery('user', getOneUser, {
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
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline"><EditIcon /></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <Tabs defaultValue="user" onValueChange={(newValue) => setSelectedTab(newValue)}>
            <TabsList>
              <TabsTrigger value="user">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="user">
              <DialogHeader>
                <DialogDescription>
                  Make changes to your profile here. Click save when you are finished.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-right">
                      User Name
                    </Label>
                    <Input id="name" className="w-full border-2" />
                  </div>
                  <div>
                    <Label htmlFor="username" className="text-right">
                      Email
                    </Label>
                    <Input id="username" className="w-full border-2" />
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="password">
              <DialogHeader>
                <DialogDescription>
                  Make changes to your profile here. Click save when you are finished.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="password" className="text-right">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        className="w-full border-2"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <button type="button" onClick={togglePasswordVisibility}>
                          {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="repeat-password" className="text-right">
                      Repeat Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="repeat-password"
                        type={showRepeatPassword ? 'text' : 'password'}
                        className="w-full border-2"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <button type="button" onClick={toggleRepeatPasswordVisibility}>
                          {showRepeatPassword ? <EyeIcon /> : <EyeOffIcon />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="bg-slate-200 w-full h-screen flex justify-center">
        <div className="flex flex-col">
          {users.map((userData, index) => (
            <>
              <div>
                <Card
                  key={index}
                  className="border mt-6 relative w-96 p-4 bg-slate-50"
                >
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