/* eslint-disable no-unused-vars */
import { useContext } from 'react'
import { CollectionContext } from '../../../context/collection'
import { LayerContext } from '../../../context/layerContext'
import { Circle } from 'react-leaflet'
import { isWithinPolygon } from '../../../helpers'

function PatentsLayer () {
  const { collection } = useContext(CollectionContext)
  const { patentsFilter, searchPolygon, isFinancingFilterActive, isGovFundsReceivedActive } = useContext(LayerContext)

  const filteredItems = collection.flatMap(item =>
    item.data
      .filter((dataItem) => !isFinancingFilterActive || dataItem.financingAccess)
      .filter((dataItem) => !isGovFundsReceivedActive || dataItem.govFundsReceived)
      .filter((dataItem) => !isNaN(dataItem.patents) && dataItem.patents <= patentsFilter[0] && dataItem.patents <= patentsFilter[1])
      .filter((dataItem) => isWithinPolygon(dataItem, searchPolygon))
  )

  const circles = filteredItems.map(filteredItem => (
    <Circle
      key={filteredItem._id}
      center={[filteredItem.latitude, filteredItem.longitude]}
      pathOptions={{ fillColor: 'orange', stroke: false, fillOpacity: 0.4 }}
      radius={filteredItem.patents * 150}
    />
  ))
  return <>{circles}</>
}

export default PatentsLayer
