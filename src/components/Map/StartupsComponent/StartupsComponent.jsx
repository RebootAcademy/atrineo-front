/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import MarkersDisplay from '../MarkersDisplay/MarkersDisplay'
import MarkerClusterGroup from 'react-leaflet-cluster'

function StartupsComponent () {
  return (
    <>
      <MarkerClusterGroup
        chunkedLoading
        polygonOptions={{ weight: 0 }}
        maxClusterRadius={50}
        iconCreateFunction={function (cluster) {
          return L.divIcon({
            html: `<span>${cluster.getChildCount()}</span>`,
            className: 'rounded-full text-white text-sm font-bold text-center bg-radial-custom',
            iconSize: L.point(40, 40, true)
          })
        }}
      >
        <MarkersDisplay />
      </MarkerClusterGroup>
    </>
  )
}

export default StartupsComponent
