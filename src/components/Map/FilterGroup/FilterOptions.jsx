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
    toggleGovFundsReceived,
    populationFilter,
    setPopulationFilter,
    minPopulation,
    maxPopulation,
    researchInvestmentFilter,
    setResearchInvestmentFilter,
    minResearchInvestment,
    maxResearchInvestment
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

  const handlePatentsMinChange = (e) => {
    const minVal = Math.max(0, parseInt(e.target.value, 10))
    if (minVal <= patentsFilter[1]) {
      setPatentsFilter([minVal, patentsFilter[1]])
    }
  }

  const handlePatentsMaxChange = (e) => {
    const maxVal = parseInt(e.target.value, 10)
    if (maxVal >= patentsFilter[0]) {
      setPatentsFilter([patentsFilter[0], maxVal])
    }
  }

  const handlePopulationSliderChange = (value) => {
    setPopulationFilter(value)
  }

  const handleResearchInvestmentSliderChange = (value) => {
    setResearchInvestmentFilter(value)
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
              onChange={handlePatentsMinChange}
            />
          </div>
          <div className="text-sm flex items-center">
            <input
              type="number"
              className="w-12"
              value={patentsFilter[1]}
              onChange={handlePatentsMaxChange}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center space-x-2 gap-2">
        <Label htmlFor="population">District Population</Label>
        <div className="flex space-x-40">
          <div className="text-sm">Min</div>
          <div className="text-sm">Max</div>
        </div>
        <Slider
          id='population'
          patentsvalue={populationFilter}
          value={populationFilter}
          min={minPopulation}
          max={maxPopulation}
          onValueChange={handlePopulationSliderChange}
        />
        {populationFilter}
      </div>

      <div className="flex flex-col items-center space-x-2 gap-2">
        <Label htmlFor="researchInvestment">Research Investment</Label>
        <div className="flex space-x-40">
          <div className="text-sm">Min</div>
          <div className="text-sm">Max</div>
        </div>
        <Slider
          id='researchInvestment'
          patentsvalue={researchInvestmentFilter}
          value={researchInvestmentFilter}
          min={minResearchInvestment}
          max={maxResearchInvestment}
          onValueChange={handleResearchInvestmentSliderChange}
        />
        {researchInvestmentFilter} €
      </div>

    </div>
  )
}

export default FilterOptions