import { useContext, useEffect } from "react"
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
  const { data } = useGeoJsonData(mapDivision)
  
  useEffect(() => {
  }, [mapDivision])  
  
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>
  if (data) {
    return (
      <section>
        <GeoJSON
          key={mapDivision}
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
