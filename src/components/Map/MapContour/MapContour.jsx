import { useContext, useEffect, useState } from "react"
import { GeoJSON } from 'react-leaflet'
import { useGeoJsonData } from '../../../hooks/useGeoJsonData'
import { LayerContext } from "../../../context/layerContext"
import PropTypes from 'prop-types'

const style = {
  opacity: 0.8,
  fillOpacity: 0.1,
  color: 'black',
  weight: 0.5,
  fillColor: 'black'
}

function ContourLayer() {
  const { mapDivision, isLoading, isError, error } = useContext(LayerContext)
  const [ adjustedDivision, setAdjustedDivision ] = useState(mapDivision)
  const { data } = useGeoJsonData(adjustedDivision)

  useEffect(() => {
    if (mapDivision === 'division4') {
      setAdjustedDivision('division3')
    } else {
      setAdjustedDivision(mapDivision)
    }
  }, [mapDivision])  
  
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>
  if (data) {
    return (
      <section>
        <GeoJSON
          key={adjustedDivision}
          data={data}
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
