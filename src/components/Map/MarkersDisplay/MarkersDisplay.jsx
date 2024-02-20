/* eslint-disable no-unused-vars */
import { CollectionContext } from '../../../context/collection'
import { useContext } from 'react'
import { isWithinPolygon } from '../../../helpers'
import MarkerComponent from '../MarkerComponent/MarkerComponent'

function MarkersDisplay ({ filters, searchPolygon }) {
  const { collection } = useContext(CollectionContext)

  const displayMarkers = () => {
    return collection.flatMap((item) =>
      item.data
        // Primero, verifica si el filtro de financiamiento está activo antes de aplicar cualquier filtrado
        .filter((dataItem) => !filters.isFinancingFilterActive || dataItem.financingAccess)
        .filter((dataItem) => !filters.isGovFundsReceivedActive || dataItem.govFundsReceived)
        .filter((dataItem) => isWithinPolygon(dataItem, searchPolygon))
        // .filter((company) => selectedRegion === "" || company.locationId[mapDivision]?.name === selectedRegion)
        .map((filteredDataItem, index) => (
          <MarkerComponent
            key={index}
            coords={{ latitude: filteredDataItem.latitude, longitude: filteredDataItem.longitude }}
            name={filteredDataItem.name}
          />
        ))
    )
  }

  return displayMarkers()
}

export default MarkersDisplay
