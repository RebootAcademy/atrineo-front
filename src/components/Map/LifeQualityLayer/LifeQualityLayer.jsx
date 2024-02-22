/* eslint-disable no-unused-vars */
import { useContext } from 'react'
import { CollectionContext } from '../../../context/collectionContext'
import { Circle } from 'react-leaflet'
import { isWithinPolygon } from '../../../helpers'

function LifeQualityLayer ({ filters, searchPolygon }) {
  const { collection } = useContext(CollectionContext)

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
