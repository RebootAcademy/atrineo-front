/* eslint-disable no-unused-vars */
import { FeatureGroup, MapContainer } from "react-leaflet"
import { useState, useRef,  } from "react"
import MapUpdater from "../MapUpdater/MapUpdaterComponent"
import ContourLayer from "../MapContour/MapContour"
import HeatMapLayer from "../HeatMapLayerComponent.jsx/HeatMapComponent"

import LayersControlComponent from "../LayersControlComponent/LayersControl"
import CoordsDisplay from "../CoordsDisplay/CoordsDisplay"
import DrawComponent from "../DrawComponent/DrawComponent"
import FilterData from "../FilterDataComponent/FilterData"

import "leaflet/dist/leaflet.css"
// import { Filter } from "lucide-react"

export default function MapComponent() {
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

        <CoordsDisplay/>

        <ContourLayer mapDivision={mapDivision}/>

        <MapUpdater center={mapCenter} />
        <FilterData mapDisivion={mapDivision}/>
        <HeatMapLayer mapDivision={mapDivision}/>
        <LayersControlComponent />
  
        {/* esto hace que se repita de nuevo el filterbyrange */}
        {/* <LayersControlComponent searchPolygon={searchPolygon} /> */}
        
        <FeatureGroup>
          <DrawComponent searchPolygon={searchPolygon} setSearchPolygon={setSearchPolygon} />
        </FeatureGroup>

      </MapContainer>
    </section>
  )
}