import { useContext, useState } from "react"
import { LayerContext } from "../../../context/layerContext"
import { CollectionContext } from "../../../context/collectionContext"
import { LocationContext } from "@/context/locationContext"
import MultipleSelector from "../../ui/MultiSelector/multple-selector"
import PropTypes from 'prop-types'

function MultipleSelectorComponent({ onValueChange }) {
  const { mapDivision } = useContext(LayerContext)
  const { collection } = useContext(CollectionContext)
  const { locations } = useContext(LocationContext)
  const [active, setActive] = useState(false)

  const onDistrictNameChange = (districts) => {
    onValueChange(districts)
  }

  const displayMultipleSelector = () => {
    // Create a set to track unique location IDs to avoid duplicates.
    const uniqueLocations = new Set()

    // Perform all operations in a single pass.
    const districtNames = collection.data
      // Filter items where the specific location ID exists.
      .filter(item => item.locationId[mapDivision])
      // Map to a new structure while checking for uniqueness.
      .map(item => {
        const locationId = item.locationId[mapDivision]
        const locationName = locations[mapDivision].find(l => l._id === locationId)?.name

        // If the location is unique and has a name, add it to the set and return the necessary structure.
        if (locationName && !uniqueLocations.has(locationId)) {
          uniqueLocations.add(locationId)
          return { value: locationName, label: locationName }
        }
        return null
      })
      // Filter out any null entries resulting from duplicates or missing names.
      .filter(item => item !== null)
      // Sort by name using localeCompare.
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
