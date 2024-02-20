/* eslint-disable no-unused-vars */
import { useContext, useState, useEffect } from 'react'
import { CollectionContext } from '../../../context/collection'
import { Circle } from 'react-leaflet'
import { LayerContext } from '../../../context/layerContext'
import { isWithinPolygon } from '../../../helpers'

function ResearchInvestmentLayer () {
  const { collection } = useContext(CollectionContext)
  const { searchPolygon } = useContext(LayerContext)
  const [filters, setFilters] = useState({
    researchInvestmentFilter: 0,
    isFinancingFilterActive: false,
    isGovFundsReceivedActive: false
  })

  const storage = window.localStorage

  useEffect(() => {
    const layerData = JSON.parse(storage.getItem('layer 1'))
    if (layerData) {
      setFilters({
        researchInvestmentFilter: layerData.researchInvestmentFilter || 0,
        isFinancingFilterActive: layerData.isFinancingFilterActive,
        isGovFundsReceivedActive: layerData.isGovFundsReceivedActive
      })
    }
  }, [])
  const filteredItems = collection.flatMap(item =>
    item.data
      .filter((dataItem) => !filters.isFinancingFilterActive || dataItem.financingAccess)
      .filter((dataItem) => !filters.isGovFundsReceivedActive || dataItem.govFundsReceived)
      .filter((dataItem) => !isNaN(dataItem.researchInvestment) && dataItem.researchInvestment <= filters.researchInvestmentFilter)
      .filter((dataItem) => isWithinPolygon(dataItem, searchPolygon))
  )

  const circles = filteredItems.map(filteredItem => (
    <Circle
      key={filteredItem._id}
      center={[filteredItem.latitude, filteredItem.longitude]}
      pathOptions={{ fillColor: 'green', stroke: false, fillOpacity: 0.4 }}
      radius={(filteredItem.researchInvestment) / 8000}
    />
  ))
  return <>{circles}</>
}

export default ResearchInvestmentLayer
