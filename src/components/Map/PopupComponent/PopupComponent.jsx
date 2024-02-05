import { Popup } from "react-leaflet"
import PropTypes from 'prop-types'

function PopupComponent({ data }) {
  return (
    <Popup>
      <div className="text-sm">{data.name}</div>
    </Popup>
  )
}

PopupComponent.propTypes = {
  data: PropTypes.object
}

export default PopupComponent