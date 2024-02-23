// import { Button } from "../../ui/Button/Button"
// import { Sheet, SheetContent, SheetTrigger } from "../../ui/Sheet/sheet"

// import LayerCard from "../LayerCard/LayerCard"

// function LayersContainer() {
//   return (
//     <aside className="grid grid-cols-2 gap-2 z-[9999999] relative top-8 left-4">
//       <Sheet key='left'>
//         <SheetTrigger asChild>
//           <Button variant="outline">
//             <div className="font-bold text-xl text-gray-600">+</div>
//           </Button>
//         </SheetTrigger>

//         <SheetContent side='left' className="p-2 flex justify-center">
//           <LayerCard />
//         </SheetContent>
//       </Sheet>
//     </aside>
//   )
// }

// export default LayersContainer


// import { useState } from "react"
// import { Button } from "../../ui/Button/Button"
// import LayerCard from "../LayerCard/LayerCard"
// function LayersContainer() {

//   const [isCardVisible, setIsCardVisible] = useState(false)

//   const onClickFilterButton = () => {
//     setIsCardVisible(!isCardVisible)
//   }

//   return (
//     <aside className="grid grid-cols-1 gap-2 z-[9999999] relative top-8 left-4">
//       <Button
//         className='max-w-12'
//         variant="outline"
//         onClick={onClickFilterButton}
//       >
//         <div className="font-bold text-xl text-gray-600">+</div>
//       </Button>

//       {isCardVisible && <LayerCard />}

//     </aside>
//   )
// }

// export default LayersContainer

import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/DropdownMenu/DropdownMenu"
import LayerCard from '../LayerCard/LayerCard'
import { LayersIcon } from "../../ui/Icons/Icons"

function LayersContainer() {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const toggleMenu = () => setMenuOpen(prev => !prev)

  const handleItemClick = (e) => {
    e.preventDefault()
  }

  return (
    <aside className="z-[9999999] flex justify-center relative top-8 left-4 bg-white rounded-sm w-10 h-10 border">
      <DropdownMenu isOpen={isMenuOpen} onOpenChange={toggleMenu}>
        <DropdownMenuTrigger>
          <LayersIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={handleItemClick}>
            <LayerCard onCloseMenu={() => setMenuOpen(false)} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </aside>
  )
}

export default LayersContainer
