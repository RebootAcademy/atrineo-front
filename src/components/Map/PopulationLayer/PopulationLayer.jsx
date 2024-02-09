import { useContext } from "react"
import { CollectionContext } from "../../../context/collection"
import { LayerContext } from "../../../context/layerContext"
import { Circle } from "react-leaflet"

function PopulationLayer() {
  const { collection } = useContext(CollectionContext)
  const { populationFilter } = useContext(LayerContext)

  const filteredItems = collection.map(item =>
    item.data.filter(dataItem =>
      !isNaN(dataItem.districtPopulation) && dataItem.districtPopulation <= populationFilter &&
      dataItem.latitude != null && dataItem.longitude != null
    )
  )

  const circles = filteredItems.map(filteredItem => (
    <Circle
      key={filteredItem._id}
      center={[filteredItem.latitude, filteredItem.longitude]}
      pathOptions={{ fillColor: "red", stroke: false, fillOpacity: 0.3 }}
      radius={filteredItem.districtPopulation * 100}
    />
  ))

  return <>{circles}</>;
}

export default PopulationLayer;
