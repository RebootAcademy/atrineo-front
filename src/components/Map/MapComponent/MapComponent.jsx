import { FeatureGroup, MapContainer } from "react-leaflet"
import { useState, useRef } from "react"

import { MapUpdater, FlyToMarker } from "../MapUpdater/MapUpdaterComponent"

import ContourLayer from "../MapContour/MapContour"
import CoordsDisplay from "../CoordsDisplay/CoordsDisplay"
import DrawComponent from "../DrawComponent/DrawComponent"
import CustomZoomControl from "../CustomZoomControl/CustomZoomControl"
import SearchBar from "../SearchBar/SearchBar"
import LayersContainer from "../LayersContainer/LayersContainer"
import StartupsComponent from "../StartupsComponent/StartupsComponent"
import TileLayerComponent from "../TileLayerComponent/TileLayerComponent"

import "leaflet/dist/leaflet.css"
import { center } from "@turf/turf"

function MapComponent() {
  const mapRef = useRef()

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
        ref={mapRef}
      >
        <TileLayerComponent />
        <ContourLayer mapDivision={mapDivision} />
        <MapUpdater center={mapCenter} />
        <FlyToMarker center={center}/>

        <div className="flex flex-col items-start">
          <SearchBar />
          <LayersContainer />
        </div>

        <CustomZoomControl />

        <StartupsComponent />

        <CoordsDisplay />
        <FeatureGroup>
          <DrawComponent />
        </FeatureGroup>

      </MapContainer>
    </section>
  )
}

export default MapComponent