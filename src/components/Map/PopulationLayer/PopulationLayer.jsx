/* eslint-disable no-unused-vars */
import { useContext } from 'react'
import { Circle } from 'react-leaflet'
import { isWithinPolygon } from '../../../helpers'
import { CollectionContext } from '../../../context/collectionContext'

function PopulationLayer ({ filters, searchPolygon }) {
  const { collection } = useContext(CollectionContext)

  const filteredItems = collection.flatMap(item =>{
  //   item.data
  //     .filter((dataItem) => !isNaN(dataItem.districtPopulation) && dataItem.districtPopulation <= filters.populationFilter[0])
  //     .filter((dataItem) => isWithinPolygon(dataItem, searchPolygon))
  //     .map(dataItem => ({
  //       ...dataItem,
  //       latitude: dataItem.locationId?.division4?.latitude,
  //       longitude: dataItem.locationId?.division4?.longitude
  //     }))
  //     .filter(({ latitude, longitude }) => latitude !== undefined && longitude !== undefined) // Filtra elementos sin latitud o longitud válidas
  // )
    return item.data.filter(row => {
      let valid = true
      row.fields.flatMap(item => {
        for (const key in filters) {
          if (key === item.fieldName && filters[key] !== item.fieldValue) {
            valid = false
          }
        }
      })
      return valid
    })
  })
  const circles = filteredItems.map((filteredItem, index) => {
    const latitude = filteredItem.locationId?.division4?.latitude
    const longitude = filteredItem.locationId?.division4?.longitude
    const [population] = filteredItem.fields.filter(field => field.fieldName === 'districtPopulation')
    return (
      <Circle
        key={index}
        center={[latitude, longitude]}
        pathOptions={{ fillColor: 'dodgerBlue', stroke: false, fillOpacity: 0.15 }}
        radius={(population.fieldValue) / 150}
      />
    )
  })

  return <>{circles}</>
}

export default PopulationLayer
