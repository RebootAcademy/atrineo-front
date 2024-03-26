import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu/DropdownMenu"


import CustomButton from "@/components/CustomButton/CustomButton"
import SettingsMenu from "@/components/SettingsMenu/SettingsMenu"

import { I18N } from "../../i18n"

function Header() {
  const navigate = useNavigate()
  const { headerOptions } = I18N.english

  const { pathname } = useLocation()
  const optionName = pathname.split('/')[1]
  const formattedOptionName = optionName.charAt(0).toUpperCase() + optionName.slice(1)
  const [selected, setSelected] = useState(formattedOptionName ? formattedOptionName : 'Map')

  const [ displayMenu, setDisplayMenu ] = useState(false)

  const width = window.innerWidth

  const selectOption = (text) => {
    setSelected(text)
    navigate(text.toLowerCase())
  }

  const isSelected = (text) => {
    return selected === text && !displayMenu ? 'border-t-2 border-primary' : ''
  }

  const displayOptions = () => {
    return headerOptions.map(option => {
      return (
        <div
          key={option.text}
          className={`${isSelected(option.text)} w-[106px] h-10`}
        >
          <CustomButton
            text={option.text}
            variant="ghost"
            fn={() => selectOption(option.text)}
            img={option.img}
          />
        </div>
      )
    })
  }

  const displayMobileOptions = () => {
    return headerOptions.map(option => {
      return (
        <div
          key={option.text}
          className={`w-[106px] h-10`}
        >
          <CustomButton
            text={option.text}
            variant="ghost"
            fn={() => selectOption(option.text)}
            img={option.img}
          />
        </div>
      )
    })
  }

  const toggleMenu = () => {
    setDisplayMenu(!displayMenu)
  }

  return (
    <header className="relative border-b border-gray-200 w-full shadow-md">
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-b from-gray-300 to-transparent"></div>
      <main className="h-20 flex items-center justify-between">
        {
          width >= 600 ?
            <div className="flex w-full">
              <button>
                <img
                  src="./atrineo_icon-removebg-preview.png"
                  alt="Atrineo icon"
                  className="p-4 w-32 md:w-32"
                />
              </button>
              <div className="flex flex-grow justify-center items-center space-x-[26px] space-x-26">
                {displayOptions()}
              </div>
              <SettingsMenu />
            </div> :
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="mx-4 h-1/4" onClick={toggleMenu}>
                  <img src="/hamburger.svg" className="h-full" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="absolute left-[-50px] top-10">
                <DropdownMenuGroup>
                  {displayMobileOptions()}
                  <SettingsMenu />
                </DropdownMenuGroup> 
              </DropdownMenuContent>
            </DropdownMenu>
        }
      </main>
    </header>
  )
}

export default Header
