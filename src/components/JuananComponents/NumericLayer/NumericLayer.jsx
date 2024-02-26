/* eslint-disable no-unused-vars */
import { Circle } from 'react-leaflet'

function NumericLayer ({ field, data, color }) {
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
          radius={value > 5000 ? value / 5000 : value > 1000 ? value / 800 : value * 100}
        />
      )
    }
  })

  return <>{circles}</>
}

export default NumericLayer
