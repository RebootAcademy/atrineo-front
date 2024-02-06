import { useState } from "react"

import { LayersControl, TileLayer } from "react-leaflet"
import RangeFilter from "../RangeFilter/RangeFilter"

function LayersControlComponent() {
  const [filterValue, setFilterValue] = useState(null)

  const handleFilterChange = (newValue) => {
    setFilterValue(newValue)
  }

  return (
    <section>
      <RangeFilter onChange={handleFilterChange} />
      <LayersControl>
        <TileLayer
          attribution='© OpenStreetMap, © CartoDB'
          url="https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png"
        />
        <TileLayer
          attribution='© OpenStreetMap, © CartoDB'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </LayersControl>
    </section>
  )
}

export default LayersControlComponent

