import { Circle, LayersControl, TileLayer } from "react-leaflet"

const LayersControlComponent = () => {
  return (
    <LayersControl position="topleft">
      <TileLayer
        attribution='© OpenStreetMap, © CartoDB'
        url="https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png"
      />
    </LayersControl>
  )
}

export default LayersControlComponent