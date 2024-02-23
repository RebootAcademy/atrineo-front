/* eslint-disable no-unused-vars */
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
  data: PropTypes.object
}

export default PopupComponent
