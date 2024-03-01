/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types'
import MarkerComponent from '../MarkerComponent/MarkerComponent'

function MarkersDisplay ({ data }) {
  const displayMarkers = () => {
    return data
      .map((item, index) => {
        const latObj = item.fields.find(field => field.fieldName === 'latitude')
        const lonObj = item.fields.find(field => field.fieldName === 'longitude')
        const nameObj = item.fields.find(field => field.fieldName === 'name')
        console.log(latObj, lonObj, nameObj)
        return (
          <MarkerComponent
            key={index}
            coords={{ latitude: latObj.fieldValue, longitude: lonObj.fieldValue }}
            name={nameObj.fieldValue}
          />
        )
      })
  }

  return (
    <div>{displayMarkers()}</div>
  )
}

MarkersDisplay.propTypes = {
  data: PropTypes.array
}

export default MarkersDisplay

