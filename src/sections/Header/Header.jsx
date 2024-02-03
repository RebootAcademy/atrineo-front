// const Header = () => {
//   return (
//     <main className="h-20 flex items-center">
//       <div className="text-3xl font-bold px-6">Atribase</div>
//     </main>
//   )
// }

// export default Header

import { useState } from "react"
import CustomButton from "../../components/CustomButton/CustomButton"

import { I18N } from "../../i18n"

function Header () {
  const [ selected, setSelected ] = useState('Map')

  const { headerOptions } = I18N.english

  const selectOption = (text) => {
    setSelected(text)
  }

  const isSelected = (text) => {
    return selected === text ? "border-t-2 border-primary" : ""
  }

  const displayOptions = () => {
    return headerOptions.map(option => {
      return (
        <div
          key={option.text}
          className={ `${isSelected(option.text)} w-[106px] h-10` }
        >
          <CustomButton
            text={option.text}
            variant="ghost"
            fn={() => selectOption(option.text)}
            img={option.img}
            isSelected={option.text === selected}
          />
        </div>
      )
    })
  }

  return (
      <header>
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
            <div className="flex flex-grow justify-center items-center space-x-[26px]">
              { displayOptions() }
            </div>
            <div className="w-32" />
            </div>
          </main>
      </header>
  )
}

export default Header;