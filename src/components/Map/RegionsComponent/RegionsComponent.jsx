import PropTypes from 'prop-types'
import HeatmapLayer from '../HeatmapLayer/HeatmapLayer'
import PatternManager from '../PatternManager/PatternManager'
import { useContext } from 'react'
import { LayerContext } from '../../../context/layerContext'
import { LocationContext } from '@/context/locationContext'

function RegionsComponent({ data, fieldName, color }) {
  console.log('Inside RegionsComponent')
  const { mapDivision } = useContext(LayerContext)
  const { locations } = useContext(LocationContext)

  if (!Array.isArray(data) || data.length === 0) {
    return console.log('No hay datos disponibles para mostrar')
  }
  // console.log(locations)
  // console.log(locations[mapDivision])
  // Función para determinar el ID de geojson basado en el nivel de división actual
  const getGeojsonIdByDivision = (item) => {
    //console.log(item.locationId[mapDivision])
    let location
    if (item.locationId[mapDivision]) {
      console.log(location._id)
      console.log(item.locationId[mapDivision])
      location = locations[mapDivision].find(location => location._id === item.locationId[mapDivision]._id)
    }
    switch (mapDivision) {
    case 'division1':
      return location ? location.geojsonId : 'noDivision1'
    case 'division2':
      return location ? location.geojsonId : 'noDivision2'
    default: // 'division3' o cualquier otro caso
      return location ? location.geojsonId : 'noDivision3'
    }
  }

  const groupedByGeojsonId = data.reduce((acc, item) => {
    const geojsonId = getGeojsonIdByDivision(item)

    if (geojsonId) {
      if (!acc[geojsonId]) {
        acc[geojsonId] = []
      }
      acc[geojsonId].push(item)
    }
    return acc
  }, {})

  const sumNumericFields = (items) => {
    const sums = items.reduce((acc, item) => {
      item.fields.forEach(field => {
        if (field.fieldName === 'latitude' || field.fieldName === 'longitude' || field.fieldName === 'districtId') {
          return
        }
        if (field.fieldType === 'number') {
          if (!acc[field.fieldName]) {
            acc[field.fieldName] = 0
          }
          acc[field.fieldName] += field.fieldValue
        }
      })
      return acc
    }, {})
    return sums
  }

  const filteredData = Object.entries(groupedByGeojsonId).map(([geojsonId, items]) => {
    const sums = sumNumericFields(items)
    const detailedSums = Object.entries(sums).map(([fieldName, total]) => ({
      fieldName,
      total
    }))
    return { geojsonId, sums: detailedSums }
  })

  return (
    <>
      <HeatmapLayer 
        data={filteredData} 
        fieldName={fieldName} 
      />
      <PatternManager color={color}/>
    </>
  )
}

RegionsComponent.propTypes = {
  data: PropTypes.array.isRequired,
  fieldName: PropTypes.string,
  color: PropTypes.string
}

export default RegionsComponent