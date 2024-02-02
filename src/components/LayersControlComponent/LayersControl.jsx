import { LayersControl, TileLayer, LayerGroup } from "react-leaflet"
import { MarkersDisplay } from "../MarkersDisplay/MarkersDisplay"
import MarkerClusterGroup from "react-leaflet-cluster"

const LayersControlComponent = () => {
  return (
    <LayersControl position="topleft">
      <TileLayer
        attribution='© OpenStreetMap, © CartoDB'
        url="https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png"
      />

      {/* <TileLayer
        attribution='© OpenStreetMap, © CartoDB'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> */}
      <LayersControl.Overlay name='Startups' checked>
        <LayerGroup>
          <MarkerClusterGroup
            chunkedLoading
            polygonOptions={{ weight: 0 }}
          >
            <MarkersDisplay />
          </MarkerClusterGroup>
        </LayerGroup>
      </LayersControl.Overlay>

    </LayersControl>
  )
}

export default LayersControlComponent

{/*       <TileLayer
  attribution='© OpenStreetMap, © CartoDB'
  url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
/> */}