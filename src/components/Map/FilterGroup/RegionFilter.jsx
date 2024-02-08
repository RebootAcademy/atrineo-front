import { Card, CardContent, CardHeader, CardTitle } from "../../ui/Card/Card"
import { useContext, useState } from "react"
import { LayerContext } from "../../../context/layerContext"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../ui/Collapsible/Collapsible"
import { Label } from "../../ui/Label/Label"
import { Checkbox } from "../../ui/Checkbox/Checkbox"
import { RadioGroup, RadioGroupItem } from "../../ui/RadioGroup/radio-group"
import { CollectionContext } from "../../../context/collection"
import { useGeoJsonData } from "../../../hooks/useGeoJsonData"
import PopulationLayer from "../PopulationLayer/PopulationLayer"

function RegionFilter({ mapDivision, title, layers, districtPopulation, showPopulation }) {
  // const [showPopulation, setShowPopulation ] = useState(false)
  const { showMarkers, toggleMarkersDisplay } = useContext(LayerContext)
  const { collection } = useContext(CollectionContext)
  const data = useGeoJsonData(mapDivision)

  const renderPopulationMarkers = () => {
    let filteredPopulation = collection[0]?.data?.filter((population) => {
      return (districtPopulation && population.hasOwnProperty('districtPopulation')) || !districtPopulation
    })

    const markers = filteredPopulation?.map((population) => {
      return markers
    })
    return renderPopulationMarkers
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
                  <Checkbox
                    id="employees"
                    className="w-4 h-4"
                  />
                  <Label htmlFor="employees">Employees</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="population"
                    className="w-4 h-4"
                    check={showPopulation}
                    onChange={() => showPopulation}
                  />
                  <Label htmlFor="population">Population</Label>
                </div>
                <div className="flex flex-col space-x-2 gap-2">
                  <Label htmlFor="lifeQuality">Life Quality</Label>
                  <RadioGroup defaultValue="option-one">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-low" id="option-one" />
                      <Label htmlFor="option-one">Low</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-medium" id="option-two" />
                      <Label htmlFor="option-two">Medium</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-high" id="option-two" />
                      <Label htmlFor="option-two">High</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CollapsibleContent>
            </div>
          ))}
        </Collapsible>
      </CardContent>
    </Card>
  )
}

export default RegionFilter