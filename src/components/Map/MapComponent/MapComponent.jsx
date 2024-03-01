/* eslint-disable no-unused-vars */
import { useContext } from 'react'

import ContourLayer from '../MapContour/MapContour'
import CoordsDisplay from '../CoordsDisplay/CoordsDisplay'
import DrawComponent from '../DrawComponent/DrawComponent'
import CustomZoomControl from '../CustomZoomControl/CustomZoomControl'
import SearchBar from '../SearchBar/SearchBar'
import LayersContainer from '../LayersContainer/LayersContainer'
import TileLayerComponent from '../TileLayerComponent/TileLayerComponent'
import LayersManager from '../LayersManager/LayersManager'
import LegendsContainer from '../LegendsContainer/LegendsContainer'

import { LayerContext } from "../../../context/layerContext"
import { MapContainer } from "react-leaflet"

import 'leaflet/dist/leaflet.css'
import HeatMapLayer from '../../HeatMapLayerComponent.jsx/HeatMapComponent'

function MapComponent() {
  const { mapDivision, mapCenter } = useContext(LayerContext)

  return (
    <section>
      <MapContainer
        center={mapCenter}
        zoom={2}
        minZoom={9}
        doubleClickZoom={false}
        style={{ height: 'calc(100vh - 80px)', width: '100vw', zIndex: 0 }}
      >

        <TileLayerComponent />
        <ContourLayer mapDivision={mapDivision} />

        <div className="flex flex-col items-start">
          <SearchBar />
          <LayersContainer />
          <LegendsContainer />
        </div>

        <CustomZoomControl />

        <LayersManager />

        <HeatMapLayer />

        <CoordsDisplay />

        <DrawComponent />

      </MapContainer>
    </section>
  )
}

export default MapComponent
