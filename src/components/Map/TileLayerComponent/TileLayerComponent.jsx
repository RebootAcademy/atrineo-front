import { TileLayer } from 'react-leaflet'

function TileLayerComponent() {
  return (
    <>
      <TileLayer
        attribution='© OpenStreetMap, © CartoDB'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <TileLayer
        attribution='© OpenStreetMap, © CartoDB'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
      />
    </>
  )
}

export default TileLayerComponent
