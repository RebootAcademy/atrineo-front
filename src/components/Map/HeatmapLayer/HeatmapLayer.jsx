import { useContext } from "react"
import { GeoJSON } from "react-leaflet"
import { useGeoJsonData } from '../../../hooks/useGeoJsonData'
import { defaultStyle } from './Styles'
import { LayerContext } from "../../../context/layerContext"
import { findMaxAndMinValues } from "../../../helpers"

import PropTypes from 'prop-types'

function HeatmapLayer({ data, fieldName }) {
  const { mapDivision } = useContext(LayerContext)
  const { data: mapData, isLoading, isError, error } = useGeoJsonData(mapDivision)

  console.log(data)
  console.log(mapData)

  const adjustedData = data.map(group => ({
    fields: group.sums.map(sum => ({
      fieldName: sum.fieldName,
      fieldValue: sum.total
    }))
  }))

  const [maxValue, minValue] = findMaxAndMinValues(adjustedData, fieldName)

  const determineStyle = (percentage) => {
    if (percentage < 25) return 'url(#patternDots)'
    if (percentage < 50) return 'url(#patternStripes)'
    if (percentage < 75) return 'url(#patternGrid)'
    return 'url(#patternZigzag)'
  }

  const setStyle = (feature) => {
    let divisionIdProperty
    if (mapDivision === 'division3') {
      divisionIdProperty = 'ID_3'
    } else if (mapDivision === 'division2') {
      divisionIdProperty = 'ID_2'
    } else if (mapDivision === 'division1') {
      divisionIdProperty = 'ID_1'
    } else {
      // Manejar otros casos o establecer un valor por defecto
      divisionIdProperty = 'ID' // Asumiendo que hay un ID genérico si no es una división específica
    }

    console.log(divisionIdProperty)

    const currentGroupId = data.find(d => d.geojsonId === feature.properties.ID_3?.toString())
    console.log(feature.properties)
    const value = currentGroupId?.sums.find(sum => sum.fieldName === fieldName)?.total

    if (value !== undefined) {
      const percentage = ((value - minValue) / (maxValue - minValue)) * 100
      return {
        fillColor: determineStyle(percentage),
        fillOpacity: 0.8,
        color: 'black',
        opacity: 0.5,
        weight: 2
      }
    }
    return defaultStyle
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading data: {error.message}</div>
  if (mapData) {
    const filteredData = { ...mapData }

    return (
      <>
        <GeoJSON
          data={filteredData}
          style={(feature) => setStyle(feature)}
        />
      </>
    )
  } else {
    return null
  }
}

HeatmapLayer.propTypes = {
  data: PropTypes.array.isRequired,
  fieldName: PropTypes.string
}

export default HeatmapLayer