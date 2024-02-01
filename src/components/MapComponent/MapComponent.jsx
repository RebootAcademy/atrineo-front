import { MapContainer } from "react-leaflet"
import { useState, useRef } from "react"
import MapUpdater from "../MapUpdater/MapUpdaterComponent"
import "leaflet/dist/leaflet.css"
import ContourLayer from "../MapContour/MapContour"

import LayersControlComponent from "../LayersControlComponent/LayersControl"

export default function MapComponent() {
  const mapRef = useRef()

  const [mapCenter, setMapCenter] = useState([48.6, 9])
  const [mapDivision, setMapDivision] = useState("division3")

  return (
    <main>
      <MapContainer
        center={mapCenter}
        zoom={2}
        minZoom={8}
        doubleClickZoom={false}
        style={{ height: "100vh", width: "100vw", zIndex: 0 }}
        ref={mapRef}
      >

        <MapUpdater center={mapCenter} />

        <LayersControlComponent />
        <ContourLayer mapDivision={mapDivision}/>
      </MapContainer>
    </main>
  )
}