import PropTypes from 'prop-types'
import HeatmapLayer from '../HeatmapLayer/HeatmapLayer'
import PatternManager from '../PatternManager/PatternManager'
import { useContext } from 'react'
import { LayerContext } from '../../../context/layerContext'

function RegionsComponent({ data, fieldName, color }) {
  const { mapDivision } = useContext(LayerContext)

  if (!Array.isArray(data) || data.length === 0) {
    return console.log('No hay datos disponibles para mostrar')
  }

  // Función para determinar el ID de geojson basado en el nivel de división actual
  const getGeojsonIdByDivision = (item) => {
    switch (mapDivision) {
    case 'division1':
      return item.locationId.division1 ? item.locationId.division1.geojsonId : 'noDivision1'
    case 'division2':
      return item.locationId.division2 ? item.locationId.division2.geojsonId : 'noDivision2'
    default: // 'division3' o cualquier otro caso
      return item.locationId.division3 ? item.locationId.division3.geojsonId : 'noDivision3'
    }
  }

  const groupedByGeojsonId = data.reduce((acc, item) => {
    const geojsonId = getGeojsonIdByDivision(item)

    if (!acc[geojsonId]) {
      acc[geojsonId] = []
    }
    acc[geojsonId].push(item)
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
  console.log(groupedByGeojsonId)
  const filteredData = Object.entries(groupedByGeojsonId).map(([geojsonId, items]) => {
    const sums = sumNumericFields(items)
    const detailedSums = Object.entries(sums).map(([fieldName, total]) => ({
      fieldName,
      total
    }))
    return { geojsonId, sums: detailedSums }
  })
  console.log(filteredData)
  return (
    <>
      <HeatmapLayer data={filteredData} fieldName={fieldName} />
      <PatternManager color={color} />
    </>
  )
}

RegionsComponent.propTypes = {
  data: PropTypes.array.isRequired,
  fieldName: PropTypes.string,
  color: PropTypes.string
}

export default RegionsComponent