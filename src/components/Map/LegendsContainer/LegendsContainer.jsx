/* eslint-disable no-unused-vars */
import { Button } from '../../ui/Button/Button'
import { LegendsIcon } from '../../ui/Icons/Icons'
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from '../../ui/Sheet/sheet'

import LayerCard from '../LayerCard/LayerCard'

function LegendsContainer () {
  return (
    <aside className="grid grid-cols-2 gap-2 z-[9999999] relative top-12 left-4">
      <Sheet key='left'>
        <SheetTrigger asChild>
          <Button variant="outline">
            <LegendsIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className="p-2 w-full h-screen flex justify-center">
          <LayerCard />
        </SheetContent>
      </Sheet>
    </aside>
  )
}

export default LegendsContainer
