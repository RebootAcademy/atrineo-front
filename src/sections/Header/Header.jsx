// const Header = () => {
//   return (
//     <main className="h-20 flex items-center">
//       <div className="text-3xl font-bold px-6">Atribase</div>
//     </main>
//   )
// }

// export default Header

import React from "react"
import { Button } from "../../components/ui/button"

const Header = () => {
    return (
        <header>
            <main className="h-20 flex items-center">
            {/* <div className="grid grid-cols-3 bg-white-400 p-6 w-max-100 h-24 md: h-32"> */}
              <button>
                <img src="./atrineo_icon-removebg-preview.png" alt="Atrineo icon" className="p-4 w-32 md:w-32"></img>
              </button>
                <div className="flex justify-center">
                <div className="flex justify-center mlspace-x-32 flex-row place-items-center flex space-x-20">
                    <button className="flex justify-center items-stretch space-x-1 hover:overline">
                    <img src="./map.svg" className="hover:overline"></img>
                    <span>Map</span>
                    </button>
                    <button className="flex justify-center items-stretch space-x-1 hover:overline">
                        <img src="./stadisctic.svg"></img>
                        <span>Stadistic</span>
                        </button>
                    <button className="flex justify-center items-stretch space-x-1 hover:overline">
                        <img src="./dataset.svg"></img>
                        <span>Dataset</span>
                        </button>
                </div>
                </div>
            </main>
        </header>
    )
}

export default Header;