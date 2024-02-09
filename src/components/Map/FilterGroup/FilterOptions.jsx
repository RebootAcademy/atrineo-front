import { useContext } from "react"
import { LayerContext } from "../../../context/layerContext"
import { Switch } from "../../ui/Switch/Switch"
import { Label } from "../../ui/Label/Label"
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "../../ui/Select/select"
import { Slider } from "../../ui/Slider/Slider"
import { useGeoJsonData } from "../../../hooks/useGeoJsonData"
import { CollectionContext } from "../../../context/collection"
import { useState } from "react"

function FilterOptions() {
  const {
    setPatentsFilter,
    setIsFinancingFilterActive,
    isGovFundsReceivedActive,
    toggleGovFundsReceived,
    setPopulationFilter
  } = useContext(LayerContext);

  const handlePatentsSliderChange = (value) => {
    setPatentsFilter(value)
  }

  const handleFinancingSwitchChange = (newState) => {
    setIsFinancingFilterActive(newState)
  }

  const handleGovFundsSwitchChange = (newState) => {
    toggleGovFundsReceived(newState)
  }

  const handlePopulationSliderChange = (value) => {
    setPopulationFilter(value)
  }

  const { collection } = useContext(CollectionContext)
  const data = useGeoJsonData

  const regionName = () => {
    const nameRegion = [...new Set(collection[0]?.data.map(item => item.districtName))];
    return nameRegion;
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center space-x-2">
        <Label htmlFor="disctrictName">District Name:</Label>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {regionName().map((district, index) => (
              
              <SelectItem key={index} value={district}>{district}</SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>


      <div className="flex items-center space-x-2">
        <Switch
          id="financing"
          className="w-11 h-6"
          onCheckedChange={handleFinancingSwitchChange}
        />
        <Label htmlFor="financing">Financing Access</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="govFunds"
          className="w-11 h-6"
          onCheckedChange={handleGovFundsSwitchChange}
        />
        <Label htmlFor="govFunds">Receive Gov Funds</Label>
      </div>
      <div className="flex flex-col items-center space-x-2 gap-2">
        <Label htmlFor="patents">Patents Nº</Label>
        <Slider onValueChange={handlePatentsSliderChange} />
      </div>
      <div className="flex flex-col items-center space-x-2 gap-2">
        <Label htmlFor="population">Population</Label>
        <Slider onValueChange={handlePopulationSliderChange} />
      </div>
    </div >
  )
}

export default FilterOptions