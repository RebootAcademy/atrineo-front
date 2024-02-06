import { Button } from "../../ui/Button/Button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../../ui/Sheet/sheet"

import LayerCard from "../LayerCard/LayerCard"

function LayersContainer() {
  return (
    <aside className="grid grid-cols-2 gap-2 z-[9999999] relative top-20 left-4">
        <Sheet key='left'>

          <SheetTrigger asChild>
            <Button variant="outline">
              <div className="font-bold text-xl text-gray-600">+</div>
            </Button>
          </SheetTrigger>

          <SheetContent side='left' className="w-[300px] h-screen">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">

                <LayerCard />

              </div>
            </div>
          </SheetContent>
        </Sheet>
    </aside>
  )
}

export default LayersContainer