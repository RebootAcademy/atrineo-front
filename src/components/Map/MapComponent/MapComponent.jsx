import { FeatureGroup, MapContainer } from "react-leaflet"
import { useContext } from "react"

import { MapUpdater } from "../MapUpdater/MapUpdaterComponent"
import HeatMapLayer from "../../HeatMapLayerComponent.jsx/HeatMapComponent"

import ContourLayer from "../MapContour/MapContour"
import CoordsDisplay from "../CoordsDisplay/CoordsDisplay"
import DrawComponent from "../DrawComponent/DrawComponent"
import CustomZoomControl from "../CustomZoomControl/CustomZoomControl"
import SearchBar from "../SearchBar/SearchBar"
import LayersContainer from "../LayersContainer/LayersContainer"
import StartupsComponent from "../StartupsComponent/StartupsComponent"
import TileLayerComponent from "../TileLayerComponent/TileLayerComponent"
import SavedLayerComponent from "../SavedLayerComponent/SavedLayerComponent"
import { LayerContext } from "../../../context/layerContext"

import "leaflet/dist/leaflet.css"

function MapComponent() {
  const { mapDivision, mapCenter, setSelectedRegion, isSavedLayerVisible } = useContext(LayerContext)

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
        <HeatMapLayer mapDivision={mapDivision} onRegionSelected={onRegionSelected} />

        <CoordsDisplay />

        <FeatureGroup>
          <DrawComponent />
        </FeatureGroup>

      </MapContainer>
    </section>
  )
}

export default MapComponent