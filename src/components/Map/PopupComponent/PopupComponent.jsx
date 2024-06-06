import { Popup } from 'react-leaflet'
import PropTypes from 'prop-types'

function PopupComponent ({ array }) {
  console.log(array)
  const displayData = (data) => {
    return data.map((d, i) => {
      return (
        <li key={i}>
          <strong>{d.fieldName} :</strong> { d.fieldValue !== null ? d.fieldValue : 'null'}
        </li>
      )
    })
  }

  return (
    <Popup>
      <div className="text-sm">
        <ul>
          { displayData(array) }
        </ul>
      </div>
    </Popup>
  )
}

PopupComponent.propTypes = {
  array: PropTypes.array
}

export default PopupComponent
