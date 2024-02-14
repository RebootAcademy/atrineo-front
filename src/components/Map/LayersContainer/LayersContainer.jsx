import { Button } from "../../ui/Button/Button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../../ui/Sheet/sheet"

import LayerCard from "../LayerCard/LayerCard"

function LayersContainer({ mapDivision }) {
  return (
    <aside className="grid grid-cols-2 gap-2 z-[9999999] relative top-8 left-4">
      <Sheet key='left'>

        <SheetTrigger asChild>
          <Button variant="outline">
            <div className="font-bold text-xl text-gray-600">+</div>
          </Button>
        </SheetTrigger>

        <SheetContent side='left' className="p-2 w-full h-screen flex justify-center">
          <LayerCard mapDivision={mapDivision} />
        </SheetContent>
      </Sheet>
    </aside>
  )
}

export default LayersContainer