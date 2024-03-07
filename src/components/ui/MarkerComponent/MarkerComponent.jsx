import { Marker } from 'react-leaflet'
import { Icon } from 'leaflet'
import PropTypes from 'prop-types'
import PopupComponent from '../../ui/PopupComponent/PopupComponent'

function MarkerComponent ({ coords, onClick, info }) {
  const lat = parseFloat(coords.latitude)
  const lng = parseFloat(coords.longitude)

  const icon = new Icon({
    iconUrl: '/marker.svg',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  })

  return (
    <Marker position={[lat, lng]} icon={icon}>
      <PopupComponent
        name={info}
        data={coords}
        eventHandlers={{ click: onClick }} />
    </Marker>
  )
}

MarkerComponent.propTypes = {
  coords: PropTypes.object,
  onClick: PropTypes.func,
  info: PropTypes.string
}

export default MarkerComponent
