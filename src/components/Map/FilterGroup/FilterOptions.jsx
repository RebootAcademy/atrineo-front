/* eslint-disable no-unused-vars */
import { useContext } from 'react'
import { LayerContext } from '../../../context/layerContext'
import { Switch } from '../../ui/Switch/Switch'
import { Label } from '../../ui/Label/Label'
import { Slider } from '../../ui/Slider/Slider'
import { CollectionContext } from '../../../context/collectionContext'
import { RadioGroup, RadioGroupItem } from '../../ui/RadioGroup/radio-group'
import { Slider2 } from '../../ui/Slider2/Slider2'
import MultipleSelector from '../../ui/MultiSelector/multple-selector'

function FilterOptions () {
  const { collection } = useContext(CollectionContext)

  const {
    patentsFilter,
    isFinancingFilterActive,
    isGovFundsReceivedActive,
    setPatentsFilter,
    setIsFinancingFilterActive,
    toggleGovFundsReceived,
    setPopulationFilter,
    setLifeQuality,
    gnp,
    setGnp,
    populationFilter,
    minPopulation,
    maxPopulation,
    researchInvestmentFilter,
    setResearchInvestmentFilter,
    minResearchInvestment,
    maxResearchInvestment,
    setSelectedNameDistrict,
    mapDivision
  } = useContext(LayerContext)

  const onDistrictNameChange = (districts) => {
    const isAllSelected = districts.some(district => district.value === 'All')
    if (isAllSelected) {
      setSelectedNameDistrict(districtSelection())
    } else {
      setSelectedNameDistrict(districts)
    }
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

  const handleResearchInvestmentSliderChange = (value) => {
    setResearchInvestmentFilter(value)
  }

  //con el regionName.map se obtiene la lista de distritos y cada elemento de la lista se representa en SelectItem
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

  const getMinGnp = () => {
    if (!collection || !collection[0]?.data) {
      return 0
    }
    const min = collection[0].data.reduce(
      (prev, curr) => {
        if (!curr.gnp) {
          return prev
        }
        return prev.gnp < curr.gnp ? prev : curr
      },
      { gnp: 999999999 }
    )
    return min.gnp
  }

  const getMaxGnp = () => {
    if (!collection || !collection[0]?.data) {
      return 100
    }
    const max = collection[0].data.reduce(
      (prev, curr) => {
        if (!curr.gnp) {
          return prev
        }
        return prev.gnp > curr.gnp ? prev : curr
      },
      { gnp: 0 }
    )
    return max.gnp
  }

  const districtSelection = () => {
    const nameRegionFiltered = collection
      .flatMap((region) => region.data)
      .filter((item) => item.locationId[mapDivision] !== null)
      .map(item => { return { id: item.locationId[mapDivision]?._id, name: item.locationId[mapDivision]?.name } })
    const nameRegion = nameRegionFiltered.reduce((prev, curr) => {
      return prev.find((item) => item.id === curr.id) ? prev : [...prev, curr]
    }, [])

    nameRegion.sort((region1, region2) => region1.name.localeCompare(region2.name))

    const districtNames = [
      {value: 'All', label: 'All'},
      ...nameRegion.map((filteredRegion) => (
        {
          value: filteredRegion.name,
          label: filteredRegion.name
        }
      ))
    ]
    return districtNames

  }
  const defaultDistictOptions = districtSelection()

  return (
    <div className="flex flex-col gap-4">
      <Label htmlFor="disctrictName">District Name:</Label>
      <div className="flex items-center space-x-2">
        <MultipleSelector
          placeholder="Select..."
          onChange={onDistrictNameChange}
          defaultOptions={defaultDistictOptions}
        >
        </MultipleSelector>
      </div>

      <div className="flex flex-col gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="govFunds"
            className="w-11 h-6"
            onCheckedChange={handleGovFundsSwitchChange}
            checked={isGovFundsReceivedActive}
          />
          <Label htmlFor="govFunds">Receive Gov Funds</Label>
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
      </div>

      <div className="flex flex-col items-center space-x-2 gap-2">
        <Label htmlFor="patents">Patents Nº</Label>
        <div className="flex space-x-40">
          <div className="text-sm">Min</div>
          <div className="text-sm">Max</div>
        </div>
        <Slider
          id="patents"
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
          id="population"
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
          id="researchInvestment"
          patentsvalue={researchInvestmentFilter}
          value={researchInvestmentFilter}
          min={minResearchInvestment}
          max={maxResearchInvestment}
          onValueChange={handleResearchInvestmentSliderChange}
        />
        {researchInvestmentFilter} €
      </div>

      <Label className="mt-4" htmlFor="lifeQuality">
        Life Quality:
      </Label>
      <RadioGroup defaultValue="comfortable" onValueChange={setLifeQuality}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="low" id="low-option" />
          <Label htmlFor="low">Low</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="medium" id="medium-option" />
          <Label htmlFor="medium">Medium</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="high" id="high-option" />
          <Label htmlFor="high">High</Label>
        </div>
      </RadioGroup>

      <Label className="mt-4" htmlFor="gnp">
        Gnp:
      </Label>
      <Slider2 onValueChange={setGnp} min={getMinGnp()} max={getMaxGnp()} />
      <Label>{gnp}</Label>
    </div>
  )
}

export default FilterOptions
