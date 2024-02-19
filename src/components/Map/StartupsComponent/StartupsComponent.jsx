import MarkersDisplay from "../MarkersDisplay/MarkersDisplay"
import MarkerClusterGroup from "react-leaflet-cluster"
import PatentsLayer from "../PatentsLayer/PatentsLayer"
import LifeQualityLayer from "../LifeQualityLayer/LifeQualityLayer"
import GnpLayer from "../GnpLayer/GnpLayer"
import PopulationLayer from "../PopulationLayer/PopulationLayer"
import ResearchInvestmentLayer from "../ResearchInvestment/ResearchInvestment"

function StartupsComponent() {
  return (
    <>
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

      <PatentsLayer />
      <PopulationLayer />
      <ResearchInvestmentLayer />
      <LifeQualityLayer />
      <GnpLayer />
    </>
  )
}

export default StartupsComponent