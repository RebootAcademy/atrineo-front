/* eslint-disable react/prop-types */
import { useState } from "react"

import { LayersControl, TileLayer, LayerGroup } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"

import MarkersDisplay from "../MarkersDisplay/MarkersDisplay"
import PopulationLayer from "../PopulationLayer/PopulationLayer"
import PatentsLayer from "../PatentsLayer/PatentsLayer"
import RangeFilter from "../RangeFilter/RangeFilter"

import PropTypes from 'prop-types'

function LayersControlComponent({ searchPolygon }) {
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
        <LayersControl.Overlay name='Startups'>
          <LayerGroup>
            <MarkerClusterGroup
              chunkedLoading
              polygonOptions={{ weight: 0 }}
              iconCreateFunction={function (cluster) {
                return L.divIcon({
                  html: `<span>${cluster.getChildCount()}</span>`,
                  className: 'rounded-full text-white text-sm font-bold text-center bg-radial-custom', // Clase personalizada
                  iconSize: L.point(40, 40, true),
                })
              }}
            >
              <MarkersDisplay searchPolygon={searchPolygon} />
            </MarkerClusterGroup>
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Populations">
          <LayerGroup>
            <PopulationLayer filterValue={filterValue} />
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Patents">
          <LayerGroup>
            <PatentsLayer filterValue={filterValue} />
          </LayerGroup>
        </LayersControl.Overlay>

      </LayersControl>

    </section>
  )
}

LayersControlComponent.propTypes = {
  searchPolygon: PropTypes.object
}

export default LayersControlComponent

