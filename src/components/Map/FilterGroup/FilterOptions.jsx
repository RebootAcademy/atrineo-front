import { useContext, useState } from "react"
import { LayerContext } from "../../../context/layerContext"
import { Switch } from "../../ui/Switch/Switch"
import { Label } from "../../ui/Label/Label"
import { Slider } from "../../ui/Slider/Slider"

function FilterOptions() {
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(100)

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
  
  const handleMinValueChange = (e) => {
    const newValue = Math.max(Number(e.target.value), 0)
    setMin(newValue)
  
    if (patentsFilter < newValue) {
      setPatentsFilter(newValue)
    }
  }
  const handlePatentsSliderChange = (value) => {
    const adjustedValue = Math.max(value, min)
    setPatentsFilter(adjustedValue)
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
          min={min}
          max={100}
        />
        <div className="flex space-x-40">
          <div className="text-sm">
            <input
              type="number"
              id="minValue"
              value={min}
              onChange={handleMinValueChange} // Maneja el cambio del valor mínimo
              className="w-12 p-1 border rounded"
            />
          </div>
          <div className="text-sm">Max</div>
        </div>
        <div>{patentsFilter}</div>
      </div>
    </div>
  )
}

export default FilterOptions