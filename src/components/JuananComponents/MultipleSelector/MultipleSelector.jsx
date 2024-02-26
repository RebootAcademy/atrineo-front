import { useContext } from "react"

import MultipleSelector from "../../ui/MultiSelector/multple-selector"
import { LayerContext } from "../../../context/layerContext"
import { CollectionContext } from "../../../context/collectionContext"

function MultipleSelectorComponent() {
  const { mapDivision, setSelectedNameDistrict } = useContext(LayerContext)
  const { collection } = useContext(CollectionContext)

  const onDistrictNameChange = (districts) => {
    const isAllSelected = districts.some(district => district.value === 'All')
    if (isAllSelected) {
      setSelectedNameDistrict(dislayMultipleSelector())
    } else {
      setSelectedNameDistrict(districts)
    }
  }

  const dislayMultipleSelector = () => {
    const nameRegionFiltered = collection
      .flatMap((region) => region.data)
      .filter((item) => item.locationId[mapDivision] !== null)
      .map(item => { return { id: item.locationId[mapDivision]?._id, name: item.locationId[mapDivision]?.name } })
    const nameRegion = nameRegionFiltered.reduce((prev, curr) => {
      return prev.find((item) => item.id === curr.id) ? prev : [...prev, curr]
    }, [])

    const sortedRegion = nameRegion.sort((region1, region2) => region1.name.localeCompare(region2.name))
    console.log(sortedRegion)

    const districtNames = [
      { value: 'All', label: 'All' },
      ...nameRegion.map((filteredRegion) => (
        {
          value: filteredRegion.name,
          label: filteredRegion.name
        }
      ))
    ]
    console.log(districtNames)
    return districtNames
  }

  const defaultDistictOptions = dislayMultipleSelector()

  const multipleSelector = () => {
    return (
      <MultipleSelector
        placeholder="Select..."
        onChange={onDistrictNameChange}
        defaultOptions={defaultDistictOptions}
      />
    )
  }
  return <>{multipleSelector()}</>
}

export default MultipleSelectorComponent
