import { useContext } from "react"
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

  const handleMinChange = (e) => {
    const minVal = Math.max(0, parseInt(e.target.value, 10))
    if (minVal <= patentsFilter[1]) {
      setPatentsFilter([minVal, patentsFilter[1]])
    }
  }

  const handleMaxChange = (e) => {
    const maxVal = parseInt(e.target.value, 10)
    if (maxVal >= patentsFilter[0]) {
      setPatentsFilter([patentsFilter[0], maxVal])
    }
  }

  console.log(patentsFilter)

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

      <div className="flex flex-col items-center space-x-2 gap-2">
        <Label htmlFor="patents">Patents Nº</Label>
        <div className="flex space-x-40">
          <div className="text-sm">Min</div>
          <div className="text-sm">Max</div>
        </div>
        <Slider 
          id='patents'
          patentsvalue={patentsFilter}
          value={patentsFilter}
          onValueChange={handlePatentsSliderChange}
        />
        <div className="flex space-x-40">
          <div className="text-sm flex items-center">
            <input 
              type="number" 
              className="w-12"
              value={patentsFilter[0]}
              onChange={handleMinChange}
            />
          </div>
          <div className="text-sm flex items-center">
            <input 
              type="number" 
              className="w-12" 
              value={patentsFilter[1]}
              onChange={handleMaxChange}
            />
          </div>
        </div>
{/*         <div>{`Min: ${patentsFilter[0]}, Max: ${patentsFilter[1]} `}</div> */}
      </div>

    </div>
  )
}

export default FilterOptions