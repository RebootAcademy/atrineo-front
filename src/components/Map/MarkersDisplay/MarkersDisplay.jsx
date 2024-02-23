/* eslint-disable no-unused-vars */
import { CollectionContext } from '../../../context/collectionContext'
import { useContext } from 'react'
import { isWithinPolygon } from '../../../helpers'
import MarkerComponent from '../MarkerComponent/MarkerComponent'
import { LayerContext } from '../../../context/layerContext'

function MarkersDisplay ({ filters, searchPolygon }) {
  const { collection } = useContext(CollectionContext)
  const { selectedNameDistrict, mapDivision } = useContext(LayerContext)

  const displayMarkers = () => {
    return collection.flatMap(item => {
      // console.log(item.data)
      // console.log(filters)
      // return item.data
      //   // Primero, verifica si el filtro de financiamiento está activo antes de aplicar cualquier filtrado
      //   .filter((dataItem) => !filters.isFinancingFilterActive || dataItem.financingAccess)
      //   .filter((dataItem) => !filters.isGovFundsReceivedActive || dataItem.govFundsReceived)
      //   .filter((dataItem) => isWithinPolygon(dataItem, searchPolygon))
      //   //si se utiliza linea 19 añadir selectedRegion al contexto en la fila 9
      //   // .filter((company) => selectedRegion === "" || company.locationId[mapDivision]?.name === selectedRegion)
      //   .filter((company) => selectedNameDistrict === 0 || selectedNameDistrict.some(district => district.value === company.locationId[mapDivision]?.name))
      
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
        .map((filteredDataItem, index) => {
          const [latObj] = filteredDataItem.fields.filter(field => field.fieldName === 'latitude')
          const [lonObj] = filteredDataItem.fields.filter(field => field.fieldName === 'longitude')
          const [nameObj] = filteredDataItem.fields.filter(field => field.fieldName === 'name')
          return (
            <MarkerComponent
              key={index}
              coords={{ latitude: latObj.fieldValue, longitude: lonObj.fieldValue }}
              name={nameObj.fieldValue}
            />
          )
        })
    })
  }

  return displayMarkers()
}

export default MarkersDisplay
