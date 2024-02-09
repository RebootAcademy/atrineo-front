import { useContext, useState } from "react"
import { LayerContext } from "../../../context/layerContext"
import { Switch } from "../../ui/Switch/Switch"
import { Label } from "../../ui/Label/Label"
import { Slider } from "../../ui/Slider/Slider"

function FilterOptions() {
  const {
    patentsFilter,
    isFinancingFilterActive,
    isGovFundsReceivedActive,
    setPatentsFilter, 
    setIsFinancingFilterActive,
    toggleGovFundsReceived
  } = useContext(LayerContext)

  
  const handleFinancingSwitchChange = (newState) => {
    setIsFinancingFilterActive(newState)
  }
  
  const handleGovFundsSwitchChange = (newState) => {
    toggleGovFundsReceived(newState)
  }
  
  const handlePatentsSliderChange = (value) => {
    setPatentsFilter(value)
  }

  return (
    <div className="flex flex-col gap-4">
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
      <div className="flex flex-col items-center space-x-2 gap-2 bg-orange-200">
        <Label htmlFor="patents">Patents Nº</Label>
        <div className="flex space-x-40">
          <div className="text-sm">Min</div>
          <div className="text-sm">Max</div>
        </div>
        <Slider 
          patentsValue={patentsFilter}
          onValueChange={handlePatentsSliderChange}
        />
        <div>{patentsFilter}</div>
      </div>
    </div>
  )
}

export default FilterOptions