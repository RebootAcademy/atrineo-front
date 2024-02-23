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

import { Button } from "../../ui/Button/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,

  DropdownMenuSeparator,

  DropdownMenuTrigger,
} from "../../ui/DropDown/DropdownMenu"

export function LayersContainer() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuTrigger>Open</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  )
}

export default LayersContainer
