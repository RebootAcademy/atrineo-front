import { useContext, useState } from "react"
import { LayerContext } from "../../../context/layerContext"
import { CollectionContext } from "../../../context/collectionContext"
import { LocationContext } from "@/context/locationContext"
import MultipleSelector from "../../ui/MultiSelector/multple-selector"
import PropTypes from 'prop-types'
import { useDivisions } from "@/hooks/useDivisions"

function MultipleSelectorComponent({ onValueChange }) {
  useDivisions()
  const { mapDivision } = useContext(LayerContext)
  const { collection } = useContext(CollectionContext)
  const { locations } = useContext(LocationContext)
  const [active, setActive] = useState(false)
  

  const onDistrictNameChange = (districts) => {
    onValueChange(districts)
  }

  const displayMultipleSelector = () => {
    const uniqueLocations = new Set()

    const districtNames = collection.data
      .filter(item => item.locationId[mapDivision])
      .map(item => {
        const locationId = item.locationId[mapDivision]
        const locationName = locations[mapDivision].find(l => l._id === locationId)?.name
        if (locationName && !uniqueLocations.has(locationId)) {
          uniqueLocations.add(locationId)
          return { value: locationName, label: locationName }
        }
        return null
      })
      .filter(item => item !== null)
      .sort((a, b) => a.label.localeCompare(b.label))

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
