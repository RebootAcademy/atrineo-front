/* eslint-disable no-unused-vars */
import { LegendsIcon } from '../../ui/Icons/Icons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/DropdownMenu/DropdownMenu"


import LegendsCard from '../LegendsCard/LegendsCard'

function LegendsContainer () {
  return (
    <aside className="z-[9999999] flex justify-center relative top-12 left-4 bg-white rounded-sm w-10 h-10 border">
      <DropdownMenu dir='ltr'>
        <DropdownMenuTrigger>
          <LegendsIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <LegendsCard />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </aside>
  )
}

export default LegendsContainer
