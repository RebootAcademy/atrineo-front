import { useContext, useState } from "react"
import { LayerContext } from "../../../context/layerContext"
import { CollectionContext } from "../../../context/collectionContext"
import MultipleSelector from "../../ui/MultiSelector/multple-selector"
import PropTypes from 'prop-types'

function MultipleSelectorComponent({ onValueChange }) {
  const { mapDivision } = useContext(LayerContext)
  const { collection } = useContext(CollectionContext)
  const [active, setActive] = useState(false)

  const onDistrictNameChange = (districts) => {
    onValueChange(districts)
  }

  const displayMultipleSelector = () => {
    const nameRegionFiltered = collection.data
      .filter((item) => item.locationId[mapDivision] !== null)
      .map((item) => ({ id: item.locationId[mapDivision]?._id, name: item.locationId[mapDivision]?.name }))
    const nameRegion = nameRegionFiltered.reduce((prev, curr) => {
      return prev.find((item) => item.id === curr.id) ? prev : [...prev, curr]
    }, [])
    console.log(nameRegion)

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

  const defaultDistrictOptions = displayMultipleSelector()

  const handleCheckboxChange = () => {
    setActive((prev) => !prev)
  }

  const multipleSelector = () => {
    return (
      <>
        <div>
          <input
            type='checkbox'
            checked={active}
            className="mr-2"
            onChange={handleCheckboxChange}
          />
          <span className="font-medium">districtNames:</span>
        </div>
        {active && (
          <MultipleSelector
            placeholder="Select Region..."
            onChange={onDistrictNameChange}
            defaultOptions={defaultDistrictOptions}
          />
        )}
      </>
    )
  }
  return <>{multipleSelector()}</>
}

MultipleSelectorComponent.propTypes = {
  onValueChange: PropTypes.func
}

export default MultipleSelectorComponent
