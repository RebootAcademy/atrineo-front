/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types'
import MarkerComponent from '../MarkerComponent/MarkerComponent'

function MarkersDisplay ({ data }) {
  const displayMarkers = () => {
    return data
      .map((item, index) => {
        const latObj = item.fields.find(field => field.fieldName === 'latitude')
        const lonObj = item.fields.find(field => field.fieldName === 'longitude')
        const nameObj = item.fields.find(field => field.fieldName === 'name')
        return (
          <MarkerComponent
            key={index}
            coords={{ latitude: latObj.fieldValue, longitude: lonObj.fieldValue }}
            name={nameObj.fieldValue}
          />
        )
      })
  }

  return (
    <div>{displayMarkers()}</div>
  )
}

MarkersDisplay.propTypes = {
  data: PropTypes.array
}

export default MarkersDisplay


// console.log(item.data)
// console.log(filters)
// return item.data
//   // Primero, verifica si el filtro de financiamiento está activo antes de aplicar cualquier filtrado
//   .filter((dataItem) => !filters.isFinancingFilterActive || dataItem.financingAccess)
//   .filter((dataItem) => !filters.isGovFundsReceivedActive || dataItem.govFundsReceived)
//   .filter((dataItem) => isWithinPolygon(dataItem, searchPolygon))
//   .filter((company) => selectedRegion === "" || company.locationId[mapDivision]?.name === selectedRegion)
//   .filter((company) => selectedNameDistrict === 0 || selectedNameDistrict.some(district => district.value === company.locationId[mapDivision]?.name))
      
// return item.data.filter(row => {
//   let valid = true
//   row.fields.flatMap(item => {
//     for (const key in filters) {
//       if (key === item.fieldName && filters[key] !== item.fieldValue) {
//         valid = false
//       }
//     }
//   })
//   return valid
// })
