/* eslint-disable no-unused-vars */
import { Button } from '../../ui/Button/Button'
import { LayersIcon } from '../../ui/Icons/Icons'
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from '../../ui/Sheet/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/DropdownMenu/DropdownMenu"

import LayerCard from '../LayerCard/LayerCard'

function LayersContainer () {
  return (
    <aside className="z-[9999999] flex justify-center relative top-8 left-4 bg-white rounded-sm w-10 h-10 border">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <LayersIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <LayerCard />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </aside>
  )
}

export default LayersContainer
