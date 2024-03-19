/* eslint-disable no-unused-vars */
import { useState } from "react"
import PropTypes from 'prop-types'
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

import { updateUser } from "@/services/userService"
import LoadingButton from "../LoadingButton/LoadingButton"

function EditInfoModalComponent({ userData }) {
  const [selectedTab, setSelectedTab] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)
  const [username, setUsername] = useState(userData.name)
  const [email, setEmail] = useState(userData.email)
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const [userInfo, setUserInfo] = useState(userData)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleRepeatPasswordVisibility = () => {
    setShowRepeatPassword(!showRepeatPassword)
  }

  const handleUserUpdate = async () => {
    setLoading(true)

    const updateFiels = {}
    if (username !== userInfo.name) {
      updateFiels.name = username
    }
    if (email !== userInfo.email) {
      updateFiels.email = email
    }
    if (password !== '' && password === repeatPassword) {
      updateFiels.password = password
    }
    const { result } = await updateUser(userInfo._id, updateFiels)
    setUserInfo(result)
    setLoading(false)
  }

  const handleSubmit = () => {
    handleUserUpdate()
  }

  return (
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
                  <Input
                    id="name"
                    className="w-full border-2"
                    placeholder={userData.name}
                    onClick={() => {
                      if (username === '') {
                        setUsername(userData.name || '')
                      }
                    }}
                    onChange={(e) => setUsername(e.target.value)}
                    onBlur={(e) => {
                      if (e.target.value === '') {
                        setUsername(userData.name || '')
                      }
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="username" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    className="w-full border-2"
                    placeholder={userData.email}
                    onClick={() => setEmail(userData.name || '')}
                    onChange={(e) => setEmail(e.target.value)}
                  />
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
        {
          loading ? <LoadingButton /> :
            <DialogFooter className='flex justify-center'>
              <Button
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </DialogFooter>
        }
      </DialogContent>
    </Dialog>
  )
}

EditInfoModalComponent.propTypes = {
  userData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  })
}

export default EditInfoModalComponent