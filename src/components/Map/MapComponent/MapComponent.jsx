import { FeatureGroup, MapContainer } from "react-leaflet"
import { useState, useContext } from "react"

import { MapUpdater } from "../MapUpdater/MapUpdaterComponent"

import ContourLayer from "../MapContour/MapContour"
import CoordsDisplay from "../CoordsDisplay/CoordsDisplay"
import DrawComponent from "../DrawComponent/DrawComponent"
import CustomZoomControl from "../CustomZoomControl/CustomZoomControl"
import SearchBar from "../SearchBar/SearchBar"
import LayersContainer from "../LayersContainer/LayersContainer"
import TileLayerComponent from "../TileLayerComponent/TileLayerComponent"
import SavedLayerComponent from "../SavedLayerComponent/SavedLayerComponent"

import { LayerContext } from "../../../context/layerContext"

import "leaflet/dist/leaflet.css"
import LayersManager from "../LayersManager/LayersManager"

function MapComponent() {
  const [mapCenter, setMapCenter] = useState([48.6, 9])
  const [mapDivision, setMapDivision] = useState("division3")
  const [showPopulation, setShowPopulation] = useState(false)
  const [selectedNameDistrict, setSelectedNameDistrict] = useState(null)
  const { setSelectedRegion, isSavedLayerVisible } = useContext(LayerContext)

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
        minZoom={9}
        doubleClickZoom={false}
        style={{ height: `calc(100vh - 80px)`, width: "100vw", zIndex: 0 }}
      >

        <TileLayerComponent />
        <ContourLayer mapDivision={mapDivision} />
        {/* <MapUpdater center={mapCenter} /> */}

        <div className="flex flex-col items-start">
          <SearchBar />
          <LayersContainer />
        </div>

        <CustomZoomControl />

        <LayersManager />

        <SavedLayerComponent />
        {/* <StartupsComponent /> */}

        <CoordsDisplay />
        
        <FeatureGroup>
          <DrawComponent />
        </FeatureGroup>

      </MapContainer>
    </section>
  )
}

export default MapComponent