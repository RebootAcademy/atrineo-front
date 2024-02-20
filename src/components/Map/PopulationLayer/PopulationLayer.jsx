/* eslint-disable no-unused-vars */
import { useContext } from 'react'
import { Circle } from 'react-leaflet'
import { isWithinPolygon } from '../../../helpers'
import { CollectionContext } from '../../../context/collection'

function PopulationLayer ({ filters, searchPolygon }) {
  const { collection } = useContext(CollectionContext)

  const filteredItems = collection.flatMap(item =>
    item.data
      .filter((dataItem) => !isNaN(dataItem.districtPopulation) && dataItem.districtPopulation <= filters.populationFilter[0])
      .filter((dataItem) => isWithinPolygon(dataItem, searchPolygon))
      .map(dataItem => ({
        ...dataItem,
        latitude: dataItem.locationId?.division4?.latitude,
        longitude: dataItem.locationId?.division4?.longitude
      }))
      .filter(({ latitude, longitude }) => latitude !== undefined && longitude !== undefined) // Filtra elementos sin latitud o longitud válidas
  )

  const circles = filteredItems.map((filteredItem, index) => (
    <Circle
      key={index}
      center={[filteredItem.latitude, filteredItem.longitude]}
      pathOptions={{ fillColor: 'dodgerBlue', stroke: false, fillOpacity: 0.15 }}
      radius={(filteredItem.districtPopulation) / 150}
    />
  ))

  return <>{circles}</>
}

export default PopulationLayer
