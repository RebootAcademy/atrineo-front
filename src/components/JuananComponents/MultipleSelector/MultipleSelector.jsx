// import { useContext } from "react"

// import MultipleSelector from "../../ui/MultiSelector/multple-selector"
// import { LayerContext } from "../../../context/layerContext"
// import { CollectionContext } from "../../../context/collectionContext"

// function MultipleSelectorComponent() {
//   const { mapDivision } = useContext(LayerContext)
//   const { collection } = useContext(CollectionContext)

//   const dislayMultipleSelector = () => {
//     const nameRegion = collection
//       .flatMap((item) => {
//         return item.data
//           .filter(filteredItem => filteredItem?.locationId[mapDivision]?.name)
//           .map(filteredItem => { return filteredItem.locationId[mapDivision]?.name })
//           .reduce((prev, curr) => {
//             return prev.find((filteredItem) => filteredItem.name === curr.name) ? prev : [...prev, curr]
//           }, [])
//       })

//     const sortedRegion = nameRegion.sort((region1, region2) => region1.name.localeCompare(region2.name))
//     console.log(sortedRegion)

//     // const districtNames = [
//     //   { value: 'All', label: 'All' },
//     //   ...nameRegion.map((filteredRegion) => (
//     //     {
//     //       value: filteredRegion.name,
//     //       label: filteredRegion.name
//     //     }
//     //   ))
//     // ]
//     console.log(nameRegion)
//     return nameRegion
//   }

//   const defaultDistictOptions = dislayMultipleSelector()

//   const multipleSelector = (nameRegion) => {
//     return (
//       <MultipleSelector
//         placeholder="Select..."
//         onChange={onDistrictNameChange}
//         defaultOptions={defaultDistictOptions}
//       />
//     )
//   }
// }

// export default MultipleSelectorComponent
