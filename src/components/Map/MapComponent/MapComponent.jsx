/* eslint-disable no-unused-vars */
import { FeatureGroup, MapContainer } from 'react-leaflet'
import { useState } from 'react'

// import { MapUpdater } from "../MapUpdater/MapUpdaterComponent"

import ContourLayer from '../MapContour/MapContour'
import CoordsDisplay from '../CoordsDisplay/CoordsDisplay'
import DrawComponent from '../DrawComponent/DrawComponent'
import CustomZoomControl from '../CustomZoomControl/CustomZoomControl'
import SearchBar from '../SearchBar/SearchBar'
import LayersContainer from '../LayersContainer/LayersContainer'
import TileLayerComponent from '../TileLayerComponent/TileLayerComponent'
import SavedLayerComponent from '../SavedLayerComponent/SavedLayerComponent'
import LayersManager from '../LayersManager/LayersManager'

import 'leaflet/dist/leaflet.css'

import { EditControl } from 'react-leaflet-draw'

function MapComponent () {
  const [mapCenter, setMapCenter] = useState([48.6, 9])
  const [mapDivision, setMapDivision] = useState('division3')

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
        {/* <MapUpdater center={mapCenter} /> */}

        <div className="flex flex-col items-start">
          <SearchBar />
          <LayersContainer />
        </div>

        <CustomZoomControl />

        <LayersManager />

        <SavedLayerComponent />
        {/* <StartupsComponent /> */}

        <CoordsDisplay />

        <FeatureGroup>
{/*           <EditControl
            position="topright"
            draw={{
              marker: false,
              circlemarker: false,
              circle: false,
              polyline: false,
            }}
          > */}
            <DrawComponent />
          {/* </EditControl> */}
        </FeatureGroup>

      </MapContainer>
    </section>
  )
}

export default MapComponent
