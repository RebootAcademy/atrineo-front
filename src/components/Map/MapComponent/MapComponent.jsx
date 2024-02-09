import { FeatureGroup, MapContainer } from "react-leaflet"
import { useState, useRef } from "react"
import MapUpdater from "../MapUpdater/MapUpdaterComponent"
import ContourLayer from "../MapContour/MapContour"
import HeatMapLayer from "../../HeatMapLayerComponent.jsx/HeatMapComponent"

import CoordsDisplay from "../CoordsDisplay/CoordsDisplay"
import DrawComponent from "../DrawComponent/DrawComponent"
import FilterData from "../../FilterDataComponent/FilterData"

import "leaflet/dist/leaflet.css"

import CustomZoomControl from "../CustomZoomControl/CustomZoomControl"
import SearchBar from "../SearchBar/SearchBar"
import LayersContainer from "../LayersContainer/LayersContainer"
import StartupsComponent from "../StartupsComponent/StartupsComponent"
import PopulationLayer from "../PopulationLayer/PopulationLayer"
import RangeFilter from "../RangeFilter/RangeFilter"
import TileLayerComponent from "../TileLayerComponent/TileLayerComponent"
// import { Filter } from "lucide-react"

function MapComponent() {
  const mapRef = useRef()

  const [mapCenter, setMapCenter] = useState([48.6, 9])
  const [filterValue, setFilterValue] = useState(null)
  const [mapDivision, setMapDivision] = useState("division3")

  const handleFilterChange = (newValue) => {
    setFilterValue(newValue)
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
        <TileLayerComponent />
        <ContourLayer mapDivision={mapDivision} />
        <MapUpdater center={mapCenter} />

        <RangeFilter onChange={handleFilterChange} />

        <div className="flex flex-col items-start">
          <SearchBar />
          <LayersContainer />
        </div>

        <CustomZoomControl />

        <StartupsComponent />

        <PopulationLayer filterValue={filterValue} />

        <CoordsDisplay />
        <FeatureGroup>
          <DrawComponent />
        </FeatureGroup>

      </MapContainer>
    </section>
  )
}

export default MapComponent