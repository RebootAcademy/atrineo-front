// import { useContext } from "react"
// import { LayerContext } from "../../../context/layerContext"
// import { CollectionContext } from "../../../context/collectionContext"
// import { SelectItem } from "../../ui/Select/Select"

// function DistrictSelection() {
//   const {
//     mapDivision
//   } = useContext(LayerContext)

//   const {
//     collection
//   } = useContext(CollectionContext)

//   //se hace el filtro primero para poder filtar por los item que contenga algo diferente a null y los devuelve
//   console.log(collection)
//   const nameRegionFiltered = collection
//   .flatMap((region) => region.data)
//   .filter((item) => item.locationId[mapDivision] !== null)
//   .map(item => { return { id: item.locationId[mapDivision]?._id, name: item.locationId[mapDivision]?.name }})
//   const nameRegion = nameRegionFiltered.reduce((prev, curr) => {
//     return prev.find((item) => item.id === curr.id) ? prev : [...prev, curr]
//   }, [])

//   nameRegion.sort((region1, region2) => region1.name.localeCompare(region2.name))
  
//   const districtNames = nameRegion
//   .map((filteredRegion) => (
//       <SelectItem
//           key={filteredRegion.id}
//           value={filteredRegion.name}
//       >
//         {filteredRegion.name}
//     </SelectItem>
//   ))
//   return districtNames
// }

// export default DistrictSelection