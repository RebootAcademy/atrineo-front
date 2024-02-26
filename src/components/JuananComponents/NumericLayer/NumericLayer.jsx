/* eslint-disable no-unused-vars */
import { useContext } from 'react'
import { Circle } from 'react-leaflet'
import { isWithinPolygon } from '../../../helpers'
import { CollectionContext } from '../../../context/collectionContext'

import { calculateRadius } from '../../../helpers'

// eslint-disable-next-line react/prop-types
function NumericLayer({ field, filters, searchPolygon, data, color }) {
  const { collection } = useContext(CollectionContext)
  // const filteredItems = data.filter(row => {
  //   let valid = true
  //   row.fields.flatMap(item => {
  //     if (field === item.fieldName && filters[field] > item.fieldValue) {
  //       valid = false
  //     }
  //   })
  //   return valid
  // })

  // eslint-disable-next-line react/prop-types
  const circles = data.map((filteredItem, index) => {
    console.log(filteredItem.locationId.division4)
    const latitude = filteredItem.locationId?.division4?.latitude
    console.log(latitude)
    const longitude = filteredItem.locationId?.division4?.longitude
    console.log(longitude)
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
