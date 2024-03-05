import { useContext } from "react"
import { GeoJSON } from "react-leaflet"
import { useGeoJsonData } from '../../../hooks/useGeoJsonData'
import { below10, between10and20, between20and35, over35, defaultStyle } from './Styles'
import { LayerContext } from "../../../context/layerContext"
import PropTypes from 'prop-types'
import { findMaxAndMinValues } from "../../../helpers"

function HeatmapLayer({ data, fieldName }) {
  const { mapDivision } = useContext(LayerContext)
  const mapData = useGeoJsonData(mapDivision)

  const adjustedData = data.map(group => ({
    fields: group.sums.map(sum => ({
      fieldName: sum.fieldName,
      fieldValue: sum.total
    }))
  }))

  const [maxValue, minValue] = findMaxAndMinValues(adjustedData, fieldName)

  const determineStyle = (percentage) => {
    if (percentage < 25) return below10
    if (percentage < 50) return between10and20
    if (percentage < 75) return between20and35
    return over35
  }

  /*   const determineStyle = (percentage) => {
    if (percentage < 25) return 'patternBelow25'
    if (percentage < 50) return 'patternBelow50'
    if (percentage < 75) return 'patternBelow75'
    return 'patternOver75'
  }
 */
  const setStyle = (feature) => {
    const currentGroupId = data.find(d => d.geojsonId === feature.properties.ID_3.toString())
    const value = currentGroupId?.sums.find(sum => sum.fieldName === fieldName)?.total

    if (value !== undefined) {
      const percentage = ((value - minValue) / (maxValue - minValue)) * 100
      return determineStyle(percentage)
    }
    return defaultStyle
  }


  const filteredRegions = () => {
    return mapData?.features.filter((region) => region.properties.NAME_1 === 'Baden-Württemberg')
  }

  if (mapData) {
    const filteredData = { ...mapData, features: filteredRegions() }

    return (
      <GeoJSON
        data={filteredData}
        style={(feature) => setStyle(feature)}
      />

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