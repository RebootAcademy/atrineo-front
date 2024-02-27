/* eslint-disable no-unused-vars */
import { Circle } from 'react-leaflet'
import { calculateRadius } from '../../../helpers'

// eslint-disable-next-line react/prop-types
function NumericLayer({ field, data, color }) {
  // eslint-disable-next-line react/prop-types
  const circles = data.map((filteredItem, index) => {
    // console.log(filteredItem.locationId.division4)
    const latitude = filteredItem.locationId?.division4?.latitude
    // console.log(latitude)
    const longitude = filteredItem.locationId?.division4?.longitude
    // console.log(longitude)
    const value = filteredItem.fields
      .filter(item => item.fieldName === field)
      .map(obj => obj.fieldValue)[0]
    if (latitude && longitude) {
      return (
        <Circle
          key={index}
          center={[latitude, longitude]}
          pathOptions={{ fillColor: color, stroke: false, fillOpacity: 0.20 }}
          radius={calculateRadius(value)}
        />
      )
    }
  })

  return <>{circles}</>
}

export default NumericLayer
