import { Marker } from "react-leaflet"
import { Icon } from "leaflet"
import PropTypes from 'prop-types'

export default function MarkerComponent({ info, onClick }){
  const lat = parseFloat(info.latitud)
  const lng = parseFloat(info.longitude)

  const icon = new Icon({
    iconUrl: '/marker.svg',
    iconSize: [ 30, 30 ],
    iconAnchor: [ 15, 15 ]
  })

  return (
    <Marker position={[lat, lng]}  icon={ icon }>

    </Marker>
  )
}

// eventHandlers = {{ click: onClick }} - añadir entre position y el icon de la linea 16

MarkerComponent.propTypes = { 
  info: PropTypes.object,
  onClick: PropTypes.func
}