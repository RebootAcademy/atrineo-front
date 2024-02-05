import { useState } from "react"

import { LayersControl, TileLayer, LayerGroup } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"

import { MarkersDisplay } from "../MarkersDisplay/MarkersDisplay"
import PopulationLayer from "../PopulationLayer/PopulationLayer"
import PatentsLayer from "../PatentsLayer/PatentsLayer"
import RangeFilter from "../RangeFilter/RangeFilter"

const LayersControlComponent = ({ searchPolygon }) => {
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

{/*         <TileLayer
          attribution='© OpenStreetMap, © CartoDB'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> */}

        <LayersControl.Overlay name='Startups' checked>
          <LayerGroup>
            <MarkerClusterGroup
              chunkedLoading
              polygonOptions={{ weight: 0 }}
            >
              <MarkersDisplay searchPolygon={searchPolygon} />
            </MarkerClusterGroup>
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Populations" checked>
          <LayerGroup>
            <PopulationLayer filterValue={filterValue} />
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Patents" checked>
          <LayerGroup>
            <PatentsLayer filterValue={filterValue} />
          </LayerGroup>
        </LayersControl.Overlay>

      </LayersControl>

    </section>
  )
}

export default LayersControlComponent

