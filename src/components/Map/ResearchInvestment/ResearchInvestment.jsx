/* eslint-disable no-unused-vars */
import { useContext } from 'react'
import { CollectionContext } from '../../../context/collectionContext'
import { Circle } from 'react-leaflet'
import { isWithinPolygon } from '../../../helpers'

function ResearchInvestmentLayer ({ filters, searchPolygon }) {
  const { collection } = useContext(CollectionContext)

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
