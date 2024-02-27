import { useContext } from "react"

import { LayerContext } from "../../../context/layerContext"
import { CollectionContext } from "../../../context/collectionContext"

import MultipleSelector from "../../ui/MultiSelector/multple-selector"

// eslint-disable-next-line react/prop-types
function MultipleSelectorComponent({ onValueChange }) {
  // eslint-disable-next-line no-unused-vars
  const { mapDivision, setSelectedNameDistrict } = useContext(LayerContext)
  const { collection } = useContext(CollectionContext)

  const onDistrictNameChange = (districts) => {
    console.log(districts)
    const isAllSelected = districts.some(district => district.value === 'All')
    if (isAllSelected) {
      onValueChange(dislayMultipleSelector())
    } else {
      onValueChange(districts)
      const selectedDistricts = districts.map(district => district.value)
      setSelectedNameDistrict(selectedDistricts)
    }
  }

  const dislayMultipleSelector = () => {
    const nameRegionFiltered = collection
      .flatMap((region) => region.data)
      .filter((item) => item.locationId[mapDivision] !== null)
      .map(item => {
        return { id: item.locationId[mapDivision]?._id, name: item.locationId[mapDivision]?.name }
      })
    const nameRegion = nameRegionFiltered.reduce((prev, curr) => {
      return prev.find((item) => item.id === curr.id) ? prev : [...prev, curr]
    }, [])

    // eslint-disable-next-line no-unused-vars
    const sortedRegion = nameRegion.sort((region1, region2) => region1.name.localeCompare(region2.name))

    const districtNames = [
      { value: 'All', label: 'All' },
      ...nameRegion.map((filteredRegion) => (
        {
          value: filteredRegion.name,
          label: filteredRegion.name
        }
      ))
    ]
    return districtNames
  }

  const defaultDistictOptions = dislayMultipleSelector()

  const multipleSelector = () => {
    return (
      <div>
        <input type='checkbox' className="mr-2">
        </input>
        <MultipleSelector
          placeholder="Select..."
          onChange={onDistrictNameChange}
          defaultOptions={defaultDistictOptions}
        />
      </div>
    )
  }
  return <>{multipleSelector()}</>
}

export default MultipleSelectorComponent
