import { Marker } from "react-leaflet"
import { Icon } from "leaflet"
import PropTypes from 'prop-types'
import PopupComponent from "../PopupComponent/PopupComponent"

function MarkerComponent({ coords, onClick, name }) {
  const lat = parseFloat(coords?.latitude)
  const lng = parseFloat(coords?.longitude)

  const icon = new Icon({
    iconUrl: '/marker.svg',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
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

// eventHandlers = {{ click: onClick }} - añadir entre position y el icon de la linea 16

MarkerComponent.propTypes = {
  coords: PropTypes.object,
  onClick: PropTypes.func
}

export default MarkerComponent