import { useContext } from "react"
import { GeoJSON } from "react-leaflet"
import { useGeoJsonData } from '../../../hooks/useGeoJsonData'
import { below10, between10and20, between20and35, over35, defaultStyle } from './Styles'
import { LayerContext } from "../../../context/layerContext"
import PropTypes from 'prop-types'

const HeatmapLayer = ({ data, fieldName }) => {
  const { mapDivision } = useContext(LayerContext)
  const mapData = useGeoJsonData(mapDivision)

  const setStyle = (feature) => {
    const currentGroupId = data.find(d => d.geojsonId === feature.properties.ID_3.toString())
    if (currentGroupId) {
      const value = currentGroupId?.sums.find(sum => sum.fieldName === fieldName)?.total
      if (value < 10000000) {
        return below10
      } else if (value >= 10000000 & value < 20000000) {
        return between10and20
      } else if (value >= 20000000 & value < 35000000) {
        return between20and35
      } else if (value > 35000000) {
        return over35
      }
    } else {
      return defaultStyle
    }
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