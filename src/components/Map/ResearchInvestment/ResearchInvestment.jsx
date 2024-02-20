/* eslint-disable no-unused-vars */
import { useContext } from 'react'
import { CollectionContext } from '../../../context/collection'
import { Circle } from 'react-leaflet'
import { LayerContext } from '../../../context/layerContext'
import { isWithinPolygon } from '../../../helpers'

function ResearchInvestmentLayer () {
  const { collection } = useContext(CollectionContext)
  const { researchInvestmentFilter, isFinancingFilterActive, isGovFundsReceivedActive, searchPolygon } = useContext(LayerContext)

  const filteredItems = collection.flatMap(item =>
    item.data
      .filter((dataItem) => !isFinancingFilterActive || dataItem.financingAccess)
      .filter((dataItem) => !isGovFundsReceivedActive || dataItem.govFundsReceived)
      .filter((dataItem) => !isNaN(dataItem.researchInvestment) && dataItem.researchInvestment <= researchInvestmentFilter)
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
