import { useContext } from "react"
import { LayerContext } from "../../../context/layerContext"
import { CollectionContext } from "../../../context/collection"
import { SelectItem } from "../../ui/Select/Select"

function DistrictSelection() {
  const {
    mapDivision
  } = useContext(LayerContext)

  const {
    collection
  } = useContext(CollectionContext)

  //se hace el filtro primero para poder filtar por los item que contenga algo diferente a null y los devuelve
  // const nameRegionFiltered = collection && collection[0]?.data
  //     .filter((item) => item.locationId[mapDivision] !== null)
  //     .map(item => item.locationId[mapDivision]?.name)
  // const nameRegion = [...new Set(nameRegionFiltered)]

  const filteredRegions = collection
    .flatMap(region => region.data)
    .filter((item) => item.locationId[mapDivision]?.name)
    .map(item => item.locationId[mapDivision]?.name) 

    const nameRegion = [...new Set(filteredRegions)]
    
    const districtNames = filteredRegions.map((filteredRegion) => (
      <SelectItem
      key={filteredRegion._id}
      value={filteredRegion.districtName}
      >
      {filteredRegion.districtName}
    </SelectItem>
  ))
  
  return districtNames
}

export default DistrictSelection