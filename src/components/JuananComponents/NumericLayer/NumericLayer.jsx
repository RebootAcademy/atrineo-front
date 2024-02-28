import { Circle } from 'react-leaflet'
import { calculateRadius, findMaxAndMinValues } from '../../../helpers'

import PropTypes from 'prop-types'

function NumericLayer({ field, data, color }) {
  const [minValue, maxValue] = findMaxAndMinValues(data, field)

  console.log(minValue, maxValue)

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
          pathOptions={{ fillColor: color, stroke: true, fillOpacity: 0.15, opacity: 0.5 }}
          radius={calculateRadius(value, 1, 100)}
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
