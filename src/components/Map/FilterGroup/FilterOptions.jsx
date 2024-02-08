import { useContext } from "react"
import { LayerContext } from "../../../context/layerContext"
import { Switch } from "../../ui/Switch/Switch"
import { Label } from "../../ui/Label/Label"
import { Slider } from "../../ui/Slider/Slider"

function FilterOptions() {
  const { 
    setPatentsFilter, 
    setIsFinancingFilterActive,
    isGovFundsReceivedActive,
    toggleGovFundsReceived
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

  return (
    <div className="flex flex-col gap-4">
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
    </div>
  )
}

export default FilterOptions