function RegionsComponent({ data }) {
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

  return (
    <div>
      {Object.entries(groupedByGeojsonId).map(([geojsonId, items]) => {
        // console.log(geojsonId, items)
        const sums = sumNumericFields(items)
        return (
          <div key={geojsonId}>
            <h3>Geojson ID: {geojsonId}</h3>
            <ul>
              {Object.entries(sums).map(([fieldName, total], index) => {
                console.log(geojsonId, fieldName, total)
                return (
                  <li key={index}>
                    {fieldName}: {total}
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
  }


export default RegionsComponent