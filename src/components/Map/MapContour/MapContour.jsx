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
  const [ division4Data, setDivision4Data ] = useState({})
  const { data } = useGeoJsonData(adjustedDivision)

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('/public/geoJson/division4.geojson')
      const result = await response.json()
      setDivision4Data(result)
    }
    if (mapDivision === 'division4') {
      getData()
    } else {
      setAdjustedDivision(mapDivision)
    }
  }, [mapDivision])


  // if (mapDivision === 'division4') {
  //   console.log(division4Data)
  // } else {
  //   console.log(data)
  // }
  
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>
  if (
    (data && 
      mapDivision !== 'division4') ||
    (mapDivision === 'division4' && 
      Object.keys(division4Data).length !== 0
    )
  ) {
    return (
      <section>
        <GeoJSON
          key={mapDivision === 'division4' ? 'division4': adjustedDivision}
          data={mapDivision === 'division4' ? division4Data : data}
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
