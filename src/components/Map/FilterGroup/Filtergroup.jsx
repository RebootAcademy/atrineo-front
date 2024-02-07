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
  const { showMarkers, toggleMarkersDisplay, setPatentsFilter, financingAccess, setFinancingAccess } = useContext(LayerContext)

  const handlePatentsSliderChange = (value) => {
    setPatentsFilter(value)
  }

  const handleFinancingAccessChange = (newState) => {
    setFinancingAccess(newState)
    console.log(newState)
  }

  return (
    <Card className='mb-2'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <Collapsible>
          {layers && layers.map((layer, id) => (
            <div key={id}>
              <div key={layer.id} className="flex gap-2 mb-2">
                <input
                  type="checkbox"
                  id={layer.id}
                  checked={showMarkers[layer.id] || false} // MODIFICAR
                  onChange={() => toggleMarkersDisplay(layer.id)} // MODIFICAR
                />
                <label
                  htmlFor={layer.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  <CollapsibleTrigger className="text-lg font-bold mb-2">{layer.name}</CollapsibleTrigger>

                </label>
              </div>
              <CollapsibleContent className="flex flex-col gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="financing"
                    className="w-11 h-6"
                    checked={financingAccess}
                    onCheckedChange={handleFinancingAccessChange}
                  />
                  <Label htmlFor="financing">Financing Access</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="govFunds"
                    className="w-11 h-6"
                    
                  />
                  <Label htmlFor="govFunds">Receive Gov Funds</Label>
                </div>
                <div className="flex flex-col items-center space-x-2 gap-2">
                  <Label htmlFor="patents">Patents Nº</Label>
                  <Slider onValueChange={handlePatentsSliderChange} />
                </div>
              </CollapsibleContent>
            </div>
          ))}
        </Collapsible>

      </CardContent>
    </Card>
  )
}

export default FilterGroup