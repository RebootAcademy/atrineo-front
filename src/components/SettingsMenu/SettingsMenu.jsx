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

function SettingsMenu() {
  const navigate = useNavigate()
  const onLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("id")
    navigate("/")
  }

  const onUpdateCsv = () => {
    navigate('/dataset')
  }

  return (
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
            <DropdownMenuItem>
              Admin Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              User Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onUpdateCsv}
            >
              Update CSV
            </DropdownMenuItem>
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
  )
}

export default SettingsMenu