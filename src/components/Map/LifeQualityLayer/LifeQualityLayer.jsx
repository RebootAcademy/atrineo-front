/* eslint-disable no-unused-vars */
import { useContext, useState, useEffect } from 'react'
import { CollectionContext } from '../../../context/collection'
import { Circle } from 'react-leaflet'
import { LayerContext } from '../../../context/layerContext'
import { isWithinPolygon } from '../../../helpers'

function LifeQualityLayer () {
  const { collection } = useContext(CollectionContext)
  const { searchPolygon, nextLayerId } = useContext(LayerContext)

  const [filters, setFilters] = useState({
    lifeQuality: null
  })

  const currentLayer = nextLayerId - 1
  const storage = window.localStorage

  useEffect(() => {
    const layerData = JSON.parse(storage.getItem(`layer ${currentLayer}`))
    if (layerData) {
      setFilters({
        lifeQuality: layerData.lifeQuality
      })
    }
  }, [currentLayer])

  const companiesBySelectedLifeQuality = collection.flatMap(item =>
    item.data
      .filter((dataItem) => dataItem.lifeQuality === filters.lifeQuality)
      .filter((dataItem) => isWithinPolygon(dataItem, searchPolygon)
      ))

  let pathOptions = { fillColor: 'orange', stroke: false, fillOpacity: 0.3 }

  if (filters.lifeQuality === 'medium') pathOptions = { fillColor: 'yellow', stroke: false, fillOpacity: 0.3 }
  else if (filters.lifeQuality === 'high') pathOptions = { fillColor: 'green', stroke: false, fillOpacity: 0.3 }

  const circles = companiesBySelectedLifeQuality.map(company => (
    <Circle
      key={company._id}
      center={[company.latitude, company.longitude]}
      pathOptions={pathOptions}
      radius={4000}
    >
    </Circle>
  ))

  return <>{circles}</>
}

export default LifeQualityLayer
