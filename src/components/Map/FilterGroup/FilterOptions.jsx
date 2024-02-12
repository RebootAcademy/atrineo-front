import { useContext } from "react"
import { LayerContext } from "../../../context/layerContext"
import { Switch } from "../../ui/Switch/Switch"
import { Label } from "../../ui/Label/Label"
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "../../ui/Select/select"
import { Slider } from "../../ui/Slider/Slider"
import { CollectionContext } from "../../../context/collection"
import HeatMapLayer from "../../HeatMapLayerComponent.jsx/HeatMapComponent"
import { RadioGroup, RadioGroupItem } from "../../ui/RadioGroup/radio-group"

function FilterOptions({ mapDivision }) {
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
        <Label htmlFor="disctrictName">District Name:</Label>
        <Select onValueChange={onDistrictNameChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='unassigned'>Select</SelectItem>
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

      <div className="flex flex-col items-center space-x-2 gap-2">
        <Label htmlFor="population">Population</Label>
        <Slider onValueChange={handlePopulationSliderChange} />
      </div>

      {selectedNameDistrict && (<HeatMapLayer
        mapDivision={mapDivision}
        districtName={selectedNameDistrict} />)}

      <Label className='mt-4'htmlFor="lifeQuality">Life Quality:</Label>
      <RadioGroup defaultValue="comfortable">
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

    </div >

  )
}

export default FilterOptions