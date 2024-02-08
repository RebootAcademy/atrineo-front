import MarkersDisplay from "../MarkersDisplay/MarkersDisplay"
import MarkerClusterGroup from "react-leaflet-cluster"
import PatentsLayer from "../PatentsLayer/PatentsLayer"

import PropTypes from 'prop-types'
import { LayerContext } from "../../../context/layerContext"
import { useContext } from "react"

function StartupsComponent({ searchPolygon }) {
  const { showMarkers, showPatents } = useContext(LayerContext)
  
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
          <MarkersDisplay searchPolygon={searchPolygon} />
        </MarkerClusterGroup>
      )}
      {showPatents && <PatentsLayer />}
    </>
  )
}

StartupsComponent.propTypes = {
  searchPolygon: PropTypes.array
}

export default StartupsComponent