/* eslint-disable no-unused-vars */
import { GeoJSON } from 'react-leaflet'
import { useGeoJsonData } from '../../../hooks/useGeoJsonData'

import PropTypes from 'prop-types'

const style = {
  opacity: 0.8,
  fillOpacity: 0.1,
  color: 'var(--primary)',
  weight: 1.5
}

function ContourLayer ({ mapDivision }) {
  const data = useGeoJsonData(mapDivision)

  const filteredDivision = () => {
    return data && data.features.filter((division) => division.properties.NAME_1 === 'Baden-Württemberg')
  }

  if (data) {
    const filteredData = { ...data, features: filteredDivision() }
    return (
      <section>
        <GeoJSON
          data={(mapDivision === 'country' || mapDivision === 'division1') ? data : filteredData}
          style={style}
        />
      </section>
    )
  } else {
    return null
  }
}

ContourLayer.propTypes = {
  mapDivision: PropTypes.string
}

export default ContourLayer
