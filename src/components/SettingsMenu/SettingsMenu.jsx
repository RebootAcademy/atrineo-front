/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom"
import { SettingsIcon } from "@/components/ui/Icons/Icons"
import { Button } from "@/components/ui/Button/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/DropDown/DropdownMenu"
import { useContext } from "react"
import { UserContext } from "@/context/userContext"

function SettingsMenu() {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const onLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("id")
    navigate("/")
  }

  const onUpdateCsv = () => {
    navigate('/dataset')
  }

  return (
    <>
      <div className="w-32 flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" >
              {<SettingsIcon />}
              <p className="ml-1">Settings</p>

            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              {user?.role === 'wizard' ? (
                <>
                  <DropdownMenuItem>
                    Admin Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={onUpdateCsv}
                  >
                    Update CSV
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem>
                  User Profile
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={onLogout}
              >
                Log Out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}

export default SettingsMenu