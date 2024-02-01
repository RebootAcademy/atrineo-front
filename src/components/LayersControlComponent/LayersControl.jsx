import { LayersControl, TileLayer, LayerGroup } from "react-leaflet"
import { CollectionContext } from "../../context/collection"
import { useContext } from "react"
import MarkerClusterGroup from "react-leaflet-cluster"

import MarkerComponent from "../ui/MarkerComponent/MarkerComponent"

const LayersControlComponent = () => {
  const { collection, setCollection } = useContext(CollectionContext)

  const displayMarkers = () => {
    return collection.flatMap((item) =>
      item.data.map((dataItem, index) => (
        <MarkerComponent
          key={index}
          coords={{ latitude: dataItem.latitude, longitude: dataItem.longitude }}
        />
      ))
    )
  }

  return (
    <LayersControl position="topleft">
      {/*       <TileLayer
        attribution='© OpenStreetMap, © CartoDB'
        url="https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png"
        
      /> */}
      <TileLayer
        attribution='© OpenStreetMap, © CartoDB'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LayersControl.Overlay name='Startups' checked>
        <LayerGroup>
          <MarkerClusterGroup chunkedLoading>
            {displayMarkers()}

          </MarkerClusterGroup>
        </LayerGroup>
      </LayersControl.Overlay>
    </LayersControl>
  )
}

export default LayersControlComponent