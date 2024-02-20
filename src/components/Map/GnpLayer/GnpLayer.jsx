/* eslint-disable no-unused-vars */
import { useContext } from 'react'
import { CollectionContext } from '../../../context/collection'
import { Circle } from 'react-leaflet'
import { isWithinPolygon } from '../../../helpers'

function GnpLayer ({ filters, searchPolygon }) {
  const { collection } = useContext(CollectionContext)

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
