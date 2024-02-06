import { Button } from "../../ui/Button/Button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetFooter,
} from "../../ui/Sheet/sheet"

import { useMarkers } from "../../../context/MarkersContext"
import LayerCard from "../LayerCard/LayerCard"

function LayersContainer({ searchPolygon }) {
  const { toggleMarkersDisplay, showMarkers } = useMarkers()

  console.log('Padre: ', showMarkers)

  return (
    <div className="grid grid-cols-2 gap-2 z-[9999999] relative top-20 left-4">
        <Sheet key='left'>
          <SheetTrigger asChild>
            <Button variant="outline">
              <div className="font-bold text-xl text-gray-600">+</div>
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className="w-[300px] h-screen">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <LayerCard searchPolygon={searchPolygon}/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">

              </div>
            </div>
            <SheetFooter>
{/*               <SheetClose asChild>
              <Button type="submit" >Save changes</Button>
              </SheetClose> */}
            </SheetFooter>
          </SheetContent>
        </Sheet>
    </div>
  )
}

export default LayersContainer