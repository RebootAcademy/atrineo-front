import { useContext } from "react"
import PropTypes from 'prop-types'
import { LayerContext } from "../../../context/layerContext"
import { CollectionContext } from "../../../context/collectionContext"

import MultipleSelector from "../../ui/MultiSelector/multple-selector"

// eslint-disable-next-line react/prop-types
function MultipleSelectorComponent({ onValueChange }) {
  // eslint-disable-next-line no-unused-vars
  const { mapDivision, setSelectedNameDistrict } = useContext(LayerContext)
  const { collection } = useContext(CollectionContext)

  const onDistrictNameChange = (districts) => {
    const isAllSelected = districts.some(district => district.value === 'All')
    if (isAllSelected) {
      onValueChange(dislayMultipleSelector())
    } else {
      onValueChange(districts)
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

    // const sortedRegion = nameRegion.sort((region1, region2) => region1.name.localeCompare(region2.name))

    const districtNames = [
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
      <>
        <MultipleSelector
          placeholder="Select Region..."
          onChange={onDistrictNameChange}
          defaultOptions={defaultDistictOptions}
        />
      </>
    )
  }
  return <>{multipleSelector()}</>
}

MultipleSelectorComponent.propTypes = {
  onValueChange: PropTypes.func
}

export default MultipleSelectorComponent
