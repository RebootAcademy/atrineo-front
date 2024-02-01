import { CollectionContext } from "../../context/collection"
import { useContext } from "react"
import MarkerComponent from "../ui/MarkerComponent/MarkerComponent"

export const MarkersDisplay = () => {
  const { collection } = useContext(CollectionContext)
  return collection.flatMap((item) =>
    item.data.map((dataItem, index) => (
      <MarkerComponent
        key={index}
        coords={{ latitude: dataItem.latitude, longitude: dataItem.longitude }}
      />
    ))
  )
}
