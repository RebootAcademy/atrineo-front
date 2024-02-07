/* eslint-disable no-unused-vars */
import { FeatureGroup, MapContainer } from "react-leaflet"
import { useState, useRef, } from "react"
import MapUpdater from "../MapUpdater/MapUpdaterComponent"
import ContourLayer from "../MapContour/MapContour"
import HeatMapLayer from "../../HeatMapLayerComponent.jsx/HeatMapComponent"

import LayersControlComponent from "../LayersControlComponent/LayersControl"
import CoordsDisplay from "../CoordsDisplay/CoordsDisplay"
import DrawComponent from "../DrawComponent/DrawComponent"
import FilterData from "../../FilterDataComponent/FilterData"

import "leaflet/dist/leaflet.css"
import PopupComponent from "../../ui/PopupComponent/PopupComponent"

function MapComponent() {
  const mapRef = useRef()
  const [mapCenter, setMapCenter] = useState([48.6, 9])
  const [mapDivision, setMapDivision] = useState("division3")
  const [searchPolygon, setSearchPolygon] = useState(null)
  const [selectedRegion, setSelectedRegion] = useState('')
  //Enz, Calw, Ortenaukreis, Freudenstadt

  //Function para pasarle por props la región y que una vez se elija la región se rederiza por la región que le hemos pasado en HeatMap 54
  //Cuando usamos el set del useState todo lo que haya en el return se renderiza de nuevo pero los estados se guardan
  //Por lo que en FilterData al tener como prop la selectedRegion se pinta los marcadores de la nueva region
  const onRegionSelected = (region) => {
    setSelectedRegion(region)
  }
  
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

        <CoordsDisplay />

        <ContourLayer mapDivision={mapDivision} />

        <MapUpdater center={mapCenter} />
        <FilterData mapDivision={mapDivision} selectedRegion={selectedRegion} gnp={true}/>
        <HeatMapLayer mapDivision={mapDivision} onRegionSelected={onRegionSelected}/>
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

export default MapComponent