import { FeatureGroup, MapContainer } from "react-leaflet"
import { useState, useRef, } from "react"
import MapUpdater from "../MapUpdater/MapUpdaterComponent"
import ContourLayer from "../MapContour/MapContour"

import LayersControlComponent from "../LayersControlComponent/LayersControl"
import CoordsDisplay from "../CoordsDisplay/CoordsDisplay"
import DrawComponent from "../DrawComponent/DrawComponent"

import "leaflet/dist/leaflet.css"
import CustomZoomControl from "../CustomZoomControl/CustomZoomControl"
import SearchBar from "../SearchBar/SearchBar"
import LayersContainer from "../LayersContainer/LayersContainer"

function MapComponent() {
  const mapRef = useRef()

  const [mapCenter, setMapCenter] = useState([48.6, 9])
  const [mapDivision, setMapDivision] = useState("division3")

  const [searchPolygon, setSearchPolygon] = useState(null)

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
        <ContourLayer mapDivision={mapDivision} />
        <MapUpdater center={mapCenter} />

        <div className="flex flex-col items-start">
          <SearchBar />
          <LayersControlComponent searchPolygon={searchPolygon} />
          <LayersContainer />
        </div>


        <CustomZoomControl />

        <CoordsDisplay />
        <FeatureGroup>
          <DrawComponent searchPolygon={searchPolygon} setSearchPolygon={setSearchPolygon} />
        </FeatureGroup>

      </MapContainer>
    </section>
  )
}

export default MapComponent