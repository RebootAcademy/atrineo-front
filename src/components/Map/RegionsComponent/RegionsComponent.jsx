import PropTypes from 'prop-types'
import HeatmapLayer from '../HeatmapLayer/HeatmapLayer'

function RegionsComponent({ data, fieldName }) {
  console.log(data)
  if (!Array.isArray(data) || data.length === 0) {
    return console.log('No hay datos disponibles para mostrar')
  }

  const groupedByGeojsonId = data.reduce((acc, item) => {
    const geojsonId = item.locationId.division3 ? item.locationId.division3.geojsonId : 'noDivision3'

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
    <HeatmapLayer data={filteredData} fieldName={fieldName} />
  )
}

RegionsComponent.propTypes = {
  data: PropTypes.array.isRequired,
  fieldName: PropTypes.string
}


export default RegionsComponent