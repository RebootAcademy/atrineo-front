import { Circle } from 'react-leaflet'
import { calculateRadius, findMaxAndMinValues } from '../../../helpers'

import PropTypes from 'prop-types'

function NumericLayer({ field, data, color }) {
  const [maxValue, minValue] = findMaxAndMinValues(data, field)

  const circles = data.map((filteredItem, index) => {
    const latitude = filteredItem.locationId?.division4?.latitude
    const longitude = filteredItem.locationId?.division4?.longitude
    const value = filteredItem.fields
      .filter(item => item.fieldName === field)
      .map(obj => obj.fieldValue)[0]

    if (latitude && longitude && value !== undefined) {
      return (
        <Circle
          key={index}
          center={[latitude, longitude]}
          pathOptions={{ fillColor: color, fillOpacity: 0.15, stroke: true, color: color, opacity: 0.5, weight: 1.5 }}
          radius={calculateRadius(value, minValue, maxValue)}
        />
      )
    }
  })

  return <>{circles}</>
}

NumericLayer.propTypes = {
  field: PropTypes.any,
  data: PropTypes.any,
  color: PropTypes.string
}

export default NumericLayer
