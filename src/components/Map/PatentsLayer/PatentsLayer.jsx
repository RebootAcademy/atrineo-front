/* eslint-disable no-unused-vars */
import { useContext, useState, useEffect } from 'react'
import { CollectionContext } from '../../../context/collection'
import { LayerContext } from '../../../context/layerContext'
import { Circle } from 'react-leaflet'
import { isWithinPolygon } from '../../../helpers'

function PatentsLayer () {
  const { collection } = useContext(CollectionContext)
  const { searchPolygon, nextLayerId } = useContext(LayerContext)

  const [filters, setFilters] = useState({
    patentsFilter: [0, 100],
    isFinancingFilterActive: false,
    isGovFundsReceivedActive: false
  })

  const currentLayer = nextLayerId - 1
  const storage = window.localStorage

  useEffect(() => {
    const layerData = JSON.parse(storage.getItem(`layer ${currentLayer}`))
    if (layerData) {
      setFilters({
        patentsFilter: layerData.patentsFilter || [0, 100],
        isFinancingFilterActive: layerData.isFinancingFilterActive,
        isGovFundsReceivedActive: layerData.isGovFundsReceivedActive
      })
    }
  }, [currentLayer])

  const filteredItems = collection.flatMap(item =>
    item.data
      .filter((dataItem) => !filters.isFinancingFilterActive || dataItem.financingAccess)
      .filter((dataItem) => !filters.isGovFundsReceivedActive || dataItem.govFundsReceived)
      .filter((dataItem) => !isNaN(dataItem.patents) && dataItem.patents <= filters.patentsFilter[0] && dataItem.patents <= filters.patentsFilter[1])
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
