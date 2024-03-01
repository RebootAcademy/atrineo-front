import { useState } from "react"
import LayerCard from '../LayerCard/LayerCard'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/DropdownMenu/DropdownMenu"
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
