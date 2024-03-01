/* eslint-disable no-unused-vars */
import { Marker } from 'react-leaflet'
import { Icon } from 'leaflet'
import PropTypes from 'prop-types'
import PopupComponent from '../PopupComponent/PopupComponent'

function MarkerComponent ({ coords, onClick, name }) {
  const lat = parseFloat(coords?.latitude)
  const lng = parseFloat(coords?.longitude)

  const icon = new Icon({
    iconUrl: '/marker.svg',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  })

  return (
    <Marker position={[lat, lng]} icon={icon}>
      <PopupComponent
        name={name}
        data={coords}
        eventHandlers={{ click: onClick }}
      />
    </Marker>
  )
}

MarkerComponent.propTypes = {
  name: PropTypes.string,
  coords: PropTypes.object,
  onClick: PropTypes.func
}

export default MarkerComponent
