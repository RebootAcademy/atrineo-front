/* eslint-disable no-unused-vars */
import { TileLayer } from 'react-leaflet'

function TileLayerComponent () {
  return (
    <>
      <TileLayer
        attribution='© OpenStreetMap, © CartoDB'
        url="https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png"
      />
{/*       <TileLayer
        attribution='© OpenStreetMap, © CartoDB'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> */}
    </>
  )
}

export default TileLayerComponent
