import { FeatureGroup, MapContainer } from "react-leaflet"
import { useState } from "react"

import { FlyToMarker, MapUpdater } from "../MapUpdater/MapUpdaterComponent"

import ContourLayer from "../MapContour/MapContour"
import CoordsDisplay from "../CoordsDisplay/CoordsDisplay"
import DrawComponent from "../DrawComponent/DrawComponent"
import CustomZoomControl from "../CustomZoomControl/CustomZoomControl"
import SearchBar from "../SearchBar/SearchBar"
import LayersContainer from "../LayersContainer/LayersContainer"
import StartupsComponent from "../StartupsComponent/StartupsComponent"
import TileLayerComponent from "../TileLayerComponent/TileLayerComponent"

import "leaflet/dist/leaflet.css"

function MapComponent() {
  const [mapCenter, setMapCenter] = useState([48.6, 9])
  const [mapDivision, setMapDivision] = useState("division3")

  return (
    <section>
      <MapContainer
        center={mapCenter}
        zoom={2}
        minZoom={8}
        doubleClickZoom={false}
        style={{ height: `calc(100vh - 80px)`, width: "100vw", zIndex: 0 }}
      >
        <TileLayerComponent />
        <ContourLayer mapDivision={mapDivision} />
        <MapUpdater center={mapCenter} />

        <div className="flex flex-col items-start">
          <SearchBar />
          <LayersContainer />
        </div>

        <CustomZoomControl />

        <StartupsComponent />

        <CoordsDisplay />
        <FeatureGroup>
          <DrawComponent />
          <FlyToMarker center={mapCenter}/>
        </FeatureGroup>

      </MapContainer>
    </section>
  )
}

export default MapComponent