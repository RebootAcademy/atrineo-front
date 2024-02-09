import { useContext, useState } from "react"
import { LayerContext } from "../../../context/layerContext"
import { Switch } from "../../ui/Switch/Switch"
import { Label } from "../../ui/Label/Label"
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "../../ui/Select/select"
import { Slider } from "../../ui/Slider/Slider"
import { CollectionContext } from "../../../context/collection"
import HeatMapLayer from "../../HeatMapLayerComponent.jsx/HeatMapComponent"


function FilterOptions({mapDivision}) {
  const {
    patentsFilter,
    isFinancingFilterActive,
    isGovFundsReceivedActive,
    setPatentsFilter,
    setIsFinancingFilterActive,
    toggleGovFundsReceived,
    setPopulationFilter
  } = useContext(LayerContext)

  const [selectedNameDistrict, setSelectedNameDistrict] = useState(null)
  

  //empieza por on algo porque es un evento y es el formato por defecto
  const onDistrictNameChange = (district) => {
    setSelectedNameDistrict(district)
  }

  const handleFinancingSwitchChange = (newState) => {
    setIsFinancingFilterActive(newState)
  }

  const handleGovFundsSwitchChange = (newState) => {
    toggleGovFundsReceived(newState)
  }

  const handlePatentsSliderChange = (value) => {
    setPatentsFilter(value)
  }

  const handlePopulationSliderChange = (value) => {
    setPopulationFilter(value)
  }

  const { collection } = useContext(CollectionContext)
//se hace el filtro primero para poder filtar por los item que contenga algo diferente a null y los devuelve
  const regionName = () => {
    const nameRegionFiltered = collection[0]?.data
    .filter((item) => item.locationId[mapDivision] !== null)
    .map(item => item.locationId[mapDivision]?.name)
    const nameRegion = [...new Set(nameRegionFiltered)]
    return nameRegion;
  }

  //con el regionName.map se obtiene la lista de distritos y cada elemento de la lista se representa en SelectItem
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center space-x-2">
        <Label htmlFor="disctrictName">District Name:</Label>
        <Select onValueChange={onDistrictNameChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {regionName().map((district, index) => (
              <SelectItem
                key={index}
                value={district}
              >
                {district}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="financing"
          className="w-11 h-6"
          onCheckedChange={handleFinancingSwitchChange}
          checked={isFinancingFilterActive}
        />
        <Label htmlFor="financing">Financing Access</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="govFunds"
          className="w-11 h-6"
          onCheckedChange={handleGovFundsSwitchChange}
          checked={isGovFundsReceivedActive}
        />
        <Label htmlFor="govFunds">Receive Gov Funds</Label>
      </div>
      <div className="flex flex-col items-center space-x-2 gap-2">
        <Label htmlFor="patents">Patents Nº</Label>
        <div className="flex space-x-40">
          <div className="text-sm">Min</div>
          <div className="text-sm">Max</div>
        </div>
        <Slider
          patentsvalue={patentsFilter}
          onValueChange={handlePatentsSliderChange}
        />
        <div>{patentsFilter}</div>
      </div>

      <div className="flex flex-col items-center space-x-2 gap-2">
        <Label htmlFor="population">Population</Label>
        <Slider onValueChange={handlePopulationSliderChange} />
      </div>
      {selectedNameDistrict && (<HeatMapLayer
        mapDivision={mapDivision}
        districtName={selectedNameDistrict}
      />)}

    </div >

  )
}

export default FilterOptions