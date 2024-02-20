/* eslint-disable no-unused-vars */
import { useContext, useState, useEffect } from 'react'
import { CollectionContext } from '../../../context/collection'
import { Circle } from 'react-leaflet'
import { LayerContext } from '../../../context/layerContext'
import { isWithinPolygon } from '../../../helpers'

function GnpLayer () {
  const { collection } = useContext(CollectionContext)
  const { searchPolygon, nextLayerId } = useContext(LayerContext)
  const [filters, setFilters] = useState({ gnp: [0] })

  const currentLayer = nextLayerId - 1
  const storage = window.localStorage

  useEffect(() => {
    const layerData = JSON.parse(storage.getItem(`layer ${currentLayer}`))
    if (layerData) {
      setFilters({
        gnp: layerData.gnp || [0]
      })
    }
  }, [currentLayer])

  const companiesBySelectedGnp = collection.flatMap(item =>
    item.data
      .filter((dataItem) => dataItem.gnp <= filters.gnp[0])
      .filter((dataItem) => isWithinPolygon(dataItem, searchPolygon))
  )

  const circles = companiesBySelectedGnp.map(company => (
    <Circle
      key={company._id}
      center={[company.latitude, company.longitude]}
      pathOptions={{ fillColor: 'purple', stroke: false, fillOpacity: 0.3 }}
      radius={company.gnp / 35000}
    >
    </Circle>
  ))

  return <>{circles}</>
}

export default GnpLayer
