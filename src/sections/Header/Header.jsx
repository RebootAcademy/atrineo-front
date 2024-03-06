import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

import CustomButton from "../../components/CustomButton/CustomButton"

import { I18N } from "../../i18n"

import Modal from "./SettingsModal"

function Header() {
  const { headerOptions } = I18N.english
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const optionName = pathname.split('/')[1]
  const formattedOptionName = optionName.charAt(0).toUpperCase() + optionName.slice(1)
  const [selected, setSelected] = useState(formattedOptionName ? formattedOptionName : 'Map')

  const [isSettingsModalOpen, setIsSettngsModalOpen] = useState(false)

  const selectOption = (text) => {
    if (text === 'Settings') {
      setIsSettngsModalOpen(true)
    } else {
      setSelected(text)
      navigate(text.toLowerCase())
    }
  }

  const isSelected = (text) => {
    return selected === text ? 'border-t-2 border-primary' : ''
  }

  function onLogout() {
    localStorage.removeItem("token")
    localStorage.removeItem("id")
    navigate("/")
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

  return (
    <header className="relative border-b border-gray-200 shadow-2xl">
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-b from-gray-300 to-transparent"></div>
      <main className="h-20 flex items-center justify-between">
        {/* <div className="grid grid-cols-3 bg-white-400 p-6 w-max-100 h-24 md: h-32"> */}
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
          <div className="w-32" />
        </div>
      </main>
      <Modal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettngsModalOpen(false)}>
        <div className='modal-options'>
          <ul className="cursor-pointer">
            <p onClick={() => console.log('Admin Profile')}>Admin Profile</p>
            <p onClick={() => console.log('User Profile')}>User Profile</p>
            <p onClick={() => console.log('Update CSV')}>Update CSV</p>
            <p onClick={(onLogout)}>Logout</p>
          </ul>
        </div>
      </Modal>
    </header>
  )
}

export default Header
