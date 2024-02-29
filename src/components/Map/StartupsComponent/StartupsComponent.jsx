import MarkersDisplay from '../MarkersDisplay/MarkersDisplay'
import MarkerClusterGroup from 'react-leaflet-cluster'

function StartupsComponent({ data, searchPolygon }) {
  console.log(data)
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
        <MarkersDisplay data={data} />
      </MarkerClusterGroup>
    </>
  )
}

export default StartupsComponent
