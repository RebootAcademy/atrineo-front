/* eslint-disable no-unused-vars */
import { CollectionContext } from '../../../context/collection'
import { useContext, useEffect, useState } from 'react'
import { isWithinPolygon } from '../../../helpers'
import MarkerComponent from '../MarkerComponent/MarkerComponent'
import { LayerContext } from '../../../context/layerContext'

function MarkersDisplay () {
  const { collection } = useContext(CollectionContext)
  const { searchPolygon, nextLayerId } = useContext(LayerContext)

  const [filters, setFilters] = useState({
    isFinancingFilterActive: false,
    isGovFundsReceivedActive: false
  })

  const currentLayer = nextLayerId - 1

  const storage = window.localStorage

  useEffect(() => {
    const layerData = JSON.parse(storage.getItem(`layer ${currentLayer}`))
    if (layerData) {
      setFilters({
        isFinancingFilterActive: layerData.isFinancingFilterActive,
        isGovFundsReceivedActive: layerData.isGovFundsReceivedActive
      })
    }
  }, [currentLayer])

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
