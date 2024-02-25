/* eslint-disable no-unused-vars */
import { useContext } from 'react'
import { Circle } from 'react-leaflet'
import { isWithinPolygon } from '../../../helpers'
import { CollectionContext } from '../../../context/collectionContext'

function PopulationLayer ({ field, filters, searchPolygon }) {
  const { collection } = useContext(CollectionContext)

  const filteredItems = collection.flatMap(item =>{
    return item.data.filter(row => {
      let valid = true
      row.fields.flatMap(item => {
        if (field === item.fieldName && filters[field] > item.fieldValue) {
          valid = false
        }
      })
      return valid
    })
  })

  console.log(filteredItems)
  
  const circles = filteredItems.map((filteredItem, index) => {
    console.log(filteredItem.locationId.division4)
    const latitude = filteredItem.locationId?.division4?.latitude
    console.log(latitude)
    const longitude = filteredItem.locationId?.division4?.longitude
    console.log(longitude)
    const [population] = filteredItem.fields.filter(field => field.fieldName === 'districtPopulation')
    if (latitude && longitude) {
      return (
        <Circle
          key={index}
          center={[latitude, longitude]}
          pathOptions={{ fillColor: 'dodgerBlue', stroke: false, fillOpacity: 0.15 }}
          radius={(population.fieldValue) / 150}
        />
      )
    }
  })

  return <>{circles}</>
}

export default PopulationLayer
