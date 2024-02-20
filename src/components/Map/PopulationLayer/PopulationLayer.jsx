/* eslint-disable no-unused-vars */
import { useContext, useState, useEffect } from 'react'
import { LayerContext } from '../../../context/layerContext'
import { Circle } from 'react-leaflet'
import { isWithinPolygon } from '../../../helpers'
import { CollectionContext } from '../../../context/collection'

function PopulationLayer () {
  const { collection } = useContext(CollectionContext)
  const { searchPolygon, nextLayerId } = useContext(LayerContext)

  const [filters, setFilters] = useState({ populationFilter: [0] })

  const currentLayer = nextLayerId - 1
  const storage = window.localStorage

  useEffect(() => {
    const layerData = JSON.parse(storage.getItem(`layer ${currentLayer}`))
    if (layerData && layerData.populationFilter) {
      setFilters({
        populationFilter: layerData.populationFilter
      })
    }
  }, [currentLayer])

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
