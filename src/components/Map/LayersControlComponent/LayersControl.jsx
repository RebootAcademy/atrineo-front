import { useState } from "react"

import { LayersControl, TileLayer, LayerGroup } from "react-leaflet"
import PatentsLayer from "../PatentsLayer/PatentsLayer"
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

        <LayersControl.Overlay name="Patents" >
          <LayerGroup>
            <PatentsLayer filterValue={filterValue} />
          </LayerGroup>
        </LayersControl.Overlay>

      </LayersControl>

    </section>
  )
}



export default LayersControlComponent

