import { FeatureGroup, MapContainer } from "react-leaflet"
import { useState, useContext, useEffect } from "react"

import { MapUpdater } from "../MapUpdater/MapUpdaterComponent"

import ContourLayer from "../MapContour/MapContour"
import CoordsDisplay from "../CoordsDisplay/CoordsDisplay"
import DrawComponent from "../DrawComponent/DrawComponent"
import CustomZoomControl from "../CustomZoomControl/CustomZoomControl"
import SearchBar from "../SearchBar/SearchBar"
import LayersContainer from "../LayersContainer/LayersContainer"
import StartupsComponent from "../StartupsComponent/StartupsComponent"
import TileLayerComponent from "../TileLayerComponent/TileLayerComponent"
import HeatMapLayer from "../../HeatMapLayerComponent.jsx/HeatMapComponent"
import RegionFilter from "../FilterGroup/RegionFilter"
import SavedLayerComponent from "../SavedLayerComponent/SavedLayerComponent"

import { CollectionContext } from "../../../context/collection"
import { LayerContext } from "../../../context/layerContext"

import "leaflet/dist/leaflet.css"
import { LayerContext } from "../../../context/layerContext"

function MapComponent() {
  const [mapCenter, setMapCenter] = useState([48.6, 9])
  const [mapDivision, setMapDivision] = useState("division3")
  const [showPopulation, setShowPopulation] = useState(false)
  const [selectedNameDistrict, setSelectedNameDistrict] = useState(null)
  const [companies, setCompanies] = useState([])
  
  const { collection } = useContext(CollectionContext)
  const { setSelectedRegion, isSavedLayerVisible } = useContext(LayerContext)


  // //cada vez que selectedRegion cambia de valor se ejecutan los filtros
  // //aqui se pueden anadir mas variables como gnp, mapDivision...
  // useEffect(() => {
  //   filterCompanies()
  // }, [selectedRegion])

  // const filterCompanies = () => {
  //   if (collection && collection.length > 0) {
  //     let filteredCompanies = collection[0]?.data?.filter((company) => {
  //       return company.locationId[mapDivision]?.name === selectedRegion
  //     })
  //     setCompanies(filteredCompanies)
  //   }
  // }

  //Function para pasarle por props la región y que una vez se elija la región se rederiza por la región que le hemos pasado en HeatMap 54
  //Cuando usamos el set del useState todo lo que haya en el return se renderiza de nuevo pero los estados se guardan
  //Por lo que en FilterData al tener como prop la selectedRegion se pinta los marcadores de la nueva region
  const onRegionSelected = (region) => {
    setSelectedRegion(region)
  }

  const onPopulationClicked = () => {
    setShowPopulation(!showPopulation)
  }

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
          <LayersContainer mapDivision={mapDivision} />
        </div>

        <CustomZoomControl />
        {isSavedLayerVisible && <SavedLayerComponent />}
        <StartupsComponent />

        <HeatMapLayer mapDivision={mapDivision} onRegionSelected={onRegionSelected} selectedNameDistrict={setSelectedNameDistrict} />
        <RegionFilter onPopulationClicked={onPopulationClicked} />
        {/* <CompanyMarkerRenderer companies={companies} /> */}
        <CoordsDisplay />
        
        <FeatureGroup>
          <DrawComponent />
        </FeatureGroup>

      </MapContainer>
    </section>
  )
}

export default MapComponent