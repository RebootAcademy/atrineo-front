import MarkersDisplay from "../MarkersDisplay/MarkersDisplay"
import MarkerClusterGroup from "react-leaflet-cluster"
import { useMarkers } from "../../../context/MarkersContext"

import PropTypes from 'prop-types'

function StartupsComponent({ searchPolygon }) {
  const { showMarkers } = useMarkers()
  
  return (
    <>
      {showMarkers && (
        <MarkerClusterGroup
          chunkedLoading
          polygonOptions={{ weight: 0 }}
          iconCreateFunction={function (cluster) {
            return L.divIcon({
              html: `<span>${cluster.getChildCount()}</span>`,
              className: 'rounded-full text-white text-sm font-bold text-center bg-radial-custom', // Clase personalizada
              iconSize: L.point(40, 40, true),
            })
          }}
        >
          <MarkersDisplay searchPolygon={searchPolygon} />
        </MarkerClusterGroup>
      )}
    </>
  )
}

StartupsComponent.propTypes = {
  searchPolygon: PropTypes.object
}

export default StartupsComponent