import { Popup } from 'react-leaflet'
import PropTypes from 'prop-types'

function PopupComponent ({ name }) {
  return (
    <Popup>
      <div className="text-sm">{name}</div>
    </Popup>
  )
}

PopupComponent.propTypes = {
  name: PropTypes.string
}

export default PopupComponent
