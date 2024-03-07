import { useContext, useEffect } from "react"
import { GeoJSON, useMap } from "react-leaflet"
import { useGeoJsonData } from '../../../hooks/useGeoJsonData'
import { defaultStyle } from './Styles'
import { LayerContext } from "../../../context/layerContext"
import { findMaxAndMinValues } from "../../../helpers"

import L from 'leaflet'

import PropTypes from 'prop-types'


function HeatmapLayer({ data, fieldName }) {
  const { mapDivision } = useContext(LayerContext)
  const mapData = useGeoJsonData(mapDivision)

  const map = useMap()

  useEffect(() => {
    if (!map) return

    const geoJsonLayer = L.geoJSON(data, {
      style: () => ({
        fillColor: `url(#patternId)`,
      }),
    }).addTo(map)

    return () => {
      if (map) {
        map.removeLayer(geoJsonLayer)
      }
    }
  }, [map, data])

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
    const currentGroupId = data.find(d => d.geojsonId === feature.properties.ID_3.toString())
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

  const filteredRegions = () => {
    return mapData?.features.filter((region) => region.properties.NAME_1 === 'Baden-Württemberg')
  }

  if (mapData) {
    const filteredData = { ...mapData, features: filteredRegions() }

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