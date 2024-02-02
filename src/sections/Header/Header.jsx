// const Header = () => {
//   return (
//     <main className="h-20 flex items-center">
//       <div className="text-3xl font-bold px-6">Atribase</div>
//     </main>
//   )
// }

// export default Header

import CustomButton from "../../components/CustomButton/CustomButton";

function Header () {

  const options = [
    {
      text: 'Map',
      img: './map.svg'
    },
    {
      text: 'Statistics',
      img: './stadisctic.svg'
    },
    {
      text: 'Dataset',
      img: './dataset.svg'
    }
  ]

  const displayOptions = () => {
    return options.map(option => {
      return (
        <CustomButton
          key={option.text}
          text={option.text}
          variant="ghost"
          fn={() => console.log('click')}
          img={option.img}
        />
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
            <div className="flex flex-grow justify-center mlspace-x-32 flex-row place-items-center space-x-20">
              { displayOptions() }
            </div>
            <div className="w-32" />
            </div>
          </main>
      </header>
  )
}

export default Header;