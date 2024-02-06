import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../ui/Card/Card"

import { useContext } from "react"
import { LayerContext } from "../../../context/layerContext"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../ui/Collapsible/Collapsible"
import { Switch } from "../../ui/Switch/Switch"
import { Label } from "../../ui/Label/Label"
import { Slider } from "../../ui/Slider/Slider"

function FilterGroup({ title, layers }) {
  const { showMarkers, toggleMarkersDisplay } = useContext(LayerContext)

  return (
    <Card className='mb-2'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <Collapsible>
          <CollapsibleTrigger className="text-lg font-bold mb-2">Startups</CollapsibleTrigger>
          <CollapsibleContent className="flex flex-col gap-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="airplane-mode"
                className="w-11 h-6"
              />
              <Label htmlFor="airplane-mode">Financing Access</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="airplane-mode"
                className="w-11 h-6"
              />
              <Label htmlFor="airplane-mode">Receive Gov Funds</Label>
            </div>
            <div className="flex flex-col items-center space-x-2 gap-2">
              <Label htmlFor="airplane-mode">Employees Nº</Label>
              <Slider />
            </div>
            <div className="flex flex-col items-center space-x-2 gap-2">
              <Label htmlFor="airplane-mode">Patents Nº</Label>
              <Slider />
            </div>
          </CollapsibleContent>
        </Collapsible>

{/*         {layers && layers.map((layer) => (
          <div key={layer.id} className="flex gap-2">
            <input 
              type="checkbox" 
              id={layer.id} 
              checked={showMarkers[layer.id]} // MODIFICAR
              onChange={() => toggleMarkersDisplay(layer.id)} // MODIFICAR
            />
            <label
              htmlFor={layer.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {layer.name}
            </label>
          </div>
        ))} */}
      </CardContent>
    </Card>
  )
}

export default FilterGroup