/* eslint-disable no-unused-vars */
import { FeatureGroup, MapContainer } from "react-leaflet"
import { useState, useRef, useContext } from "react"
import { LayerContext } from "../../../context/layerContext"
import MapUpdater from "../MapUpdater/MapUpdaterComponent"
import ContourLayer from "../MapContour/MapContour"
import HeatMapLayer from "../../HeatMapLayerComponent.jsx/HeatMapComponent"
import CoordsDisplay from "../CoordsDisplay/CoordsDisplay"
import DrawComponent from "../DrawComponent/DrawComponent"
import CompanyMarkerRenderer from "../../CompanyMarkerRendererComponent/CompanyMarkerRenderer"
import { CollectionContext } from "../../../context/collection"
import "leaflet/dist/leaflet.css"

import CustomZoomControl from "../CustomZoomControl/CustomZoomControl"
import SearchBar from "../SearchBar/SearchBar"
import LayersContainer from "../LayersContainer/LayersContainer"
import StartupsComponent from "../StartupsComponent/StartupsComponent"
import PopulationCircleRenderer from "../PopulationCircleRendererComponent/PopulationCircleRenderer"
import RangeFilter from "../RangeFilter/RangeFilter"
import TileLayerComponent from "../TileLayerComponent/TileLayerComponent"
import RegionFilter from "../FilterGroup/RegionFilter"

function MapComponent() {
  const mapRef = useRef()
  const [mapCenter, setMapCenter] = useState([48.6, 9])
  const [mapDivision, setMapDivision] = useState("division3")
  const [searchPolygon, setSearchPolygon] = useState(null)
  const [selectedRegion, setSelectedRegion] = useState('')
  const [showPopulation, setShowPopulation] = useState()
  const [companies, setCompanies] = useState([])
  const { collection } = useContext(CollectionContext)

  const filterCompanies = () => {
    if (collection && collection.length > 0) {
      let filteredCompanies = collection[0]?.data?.filter((company) => {
        return company.locationId[mapDivision]?.name === selectedRegion
      })

      setCompanies(filteredCompanies)
    }
  }

  //Function para pasarle por props la región y que una vez se elija la región se rederiza por la región que le hemos pasado en HeatMap 54
  //Cuando usamos el set del useState todo lo que haya en el return se renderiza de nuevo pero los estados se guardan
  //Por lo que en FilterData al tener como prop la selectedRegion se pinta los marcadores de la nueva region
  const onRegionSelected= (region) => {
    setSelectedRegion(region)
    filterCompanies()
  }

  const onPopulationClicked = () => {
    setShowPopulation(!showPopulation)
  }

  const { showMarkers } = useContext(LayerContext)

  const shouldShowStartups = showMarkers['startups']

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
        {shouldShowStartups && <StartupsComponent searchPolygon={searchPolygon} />}

        <PopulationCircleRenderer companies={companies} showPopulation={showPopulation}/>
        <CompanyMarkerRenderer companies={companies} />

        <MapUpdater center={mapCenter} />
        <HeatMapLayer mapDivision={mapDivision} onRegionSelected={onRegionSelected} />
        <RegionFilter onPopulationClicked={onPopulationClicked}/>
        <CoordsDisplay />
        <FeatureGroup>
          <DrawComponent searchPolygon={searchPolygon} setSearchPolygon={setSearchPolygon} />
        </FeatureGroup>

      </MapContainer>
    </section>
  )
}

export default MapComponent