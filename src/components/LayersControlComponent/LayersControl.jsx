/* eslint-disable react/prop-types */
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
    <>
      <RangeFilter onChange={handleFilterChange}/>
      <LayersControl position="topleft">
        <TileLayer
          attribution='© OpenStreetMap, © CartoDB'
          url="https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png"
        />
        <LayersControl.Overlay name='Startups'>
          <LayerGroup>
            <MarkerClusterGroup
              chunkedLoading
              polygonOptions={{ weight: 0 }}
            >
              <MarkersDisplay searchPolygon={searchPolygon} />
            </MarkerClusterGroup>
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Populations">
          <LayerGroup>
            <PopulationLayer filterValue={filterValue}/>
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Patents">
          <LayerGroup>
            <PatentsLayer filterValue={filterValue} />
          </LayerGroup>
        </LayersControl.Overlay>

      </LayersControl>
    </>
  )
}

export default LayersControlComponent

{/*       <TileLayer
  attribution='© OpenStreetMap, © CartoDB'
  url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
/> */}