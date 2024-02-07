import { useContext } from "react"
import { CollectionContext } from "../../../context/collection"
import { LayerContext } from "../../../context/layerContext"
import { Circle } from "react-leaflet"

function PatentsLayer() {
  const { collection } = useContext(CollectionContext)
  const { patentsFilter } = useContext(LayerContext)

  const filteredItems = collection.flatMap(item =>
    item.data.filter(dataItem =>
      !isNaN(dataItem.patents) && dataItem.patents <= patentsFilter &&
      dataItem.latitude != null && dataItem.longitude != null
    )
  )

  const circles = filteredItems.map(filteredItem => (
    <Circle
      key={filteredItem._id}
      center={[filteredItem.latitude, filteredItem.longitude]}
      pathOptions={{ fillColor: "red", stroke: false, fillOpacity: 0.3 }}
      radius={filteredItem.patents * 100}
    />
  ))

  return <>{circles}</>;
}

export default PatentsLayer;
