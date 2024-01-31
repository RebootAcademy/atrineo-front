import { MapContainer, TileLayer } from "react-leaflet";
import { useState, useRef } from "react";
import MapUpdater from "../MapUpdater/MapUpdaterComponent";

import './MapComponent.css'
import LayersControlComponent from "../LayersControlComponent/LayersControl";

export default function MapComponent() {
  const mapRef = useRef()

  const [mapCenter, setMapCenter] = useState([48.6, 9])

  return (
    <main>
      <MapContainer
        center={mapCenter}
        zoom={2}
        minZoom={8}
        doubleClickZoom={false}
        style={{ height: "100vh", width: "100vw" }}
        ref={mapRef}
      >

        <MapUpdater center={mapCenter} />

        <LayersControlComponent />
        
      </MapContainer>
    </main>
  )
}