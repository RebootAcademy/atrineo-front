import MarkersDisplay from "../MarkersDisplay/MarkersDisplay"
import MarkerClusterGroup from "react-leaflet-cluster"
import PatentsLayer from "../PatentsLayer/PatentsLayer"
import { LayerContext } from "../../../context/layerContext"
import { useContext } from "react"
import PopulationLayer from "../PopulationLayer/PopulationLayer"
import ResearchInvestmentLayer from "../ResearchInvestment/ResearchInvestment"

function StartupsComponent() {
  const { showMarkers } = useContext(LayerContext)
  
  return (
    <>
      {showMarkers && (
        <MarkerClusterGroup
          chunkedLoading
          polygonOptions={{ weight: 0 }}
          maxClusterRadius={50}
          iconCreateFunction={function (cluster) {
            return L.divIcon({
              html: `<span>${cluster.getChildCount()}</span>`,
              className: 'rounded-full text-white text-sm font-bold text-center bg-radial-custom', // Clase personalizada
              iconSize: L.point(40, 40, true),
            })
          }}
        >
          <MarkersDisplay />
        </MarkerClusterGroup>
      )}
      <PatentsLayer />
      <PopulationLayer />
      <ResearchInvestmentLayer />
    </>
  )
}

export default StartupsComponent