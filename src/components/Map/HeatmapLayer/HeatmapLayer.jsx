/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useMemo } from "react"
import { GeoJSON } from "react-leaflet"
import { useGeoJsonData } from '../../../hooks/useGeoJsonData'
import { defaultStyle } from './Styles'
import { LayerContext } from "../../../context/layerContext"
import { findMaxAndMinValues } from "../../../helpers"

import PropTypes from 'prop-types'


function HeatmapLayer({ data, fieldName }) {
  const { mapDivision } = useContext(LayerContext)

  const { data: mapData, isLoading, isError, error } = useGeoJsonData(mapDivision)

  if (fieldName === "color" || fieldName === "maxValue" || fieldName === "minValue") {
    return null
  }

  const adjustedData = useMemo(
    () =>
      data.map((group) => ({
        fields: group.sums.map((sum) => ({
          fieldName: sum.fieldName,
          fieldValue: parseFloat(sum.total.toFixed(2)),
        })),
      })), [data])

  const [maxValue, minValue] = useMemo(
    () => findMaxAndMinValues(adjustedData, fieldName),
    [adjustedData, fieldName]
  )

  /*   useEffect(() => {
    if (maxValue !== null && minValue !== null) {
      //updateMinMaxValues(minValue, maxValue)
    }
  }, [maxValue, minValue, updateMinMaxValues]) */

  const determineStyle = (percentage) => {
    if (percentage < 25) return 'url(#patternDots)'
    if (percentage >= 25 && percentage < 50) return 'url(#patternStripes)'
    if (percentage >=50 && percentage < 75) return 'url(#patternGrid)'
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
      divisionIdProperty = 'ID' // Asumiendo que hay un ID genérico si no es una división específica
    }

    let currentGroupId
    if (divisionIdProperty === 'ID_1') {
      //En los division1 la estructura del objeto es distinta. Además, su id es un número menor que el que tiene en la Base de Datos
      currentGroupId = data.find(d => d.geojsonId === (feature.id + 1).toString())
    } else {
      currentGroupId = data.find(d => d.geojsonId === feature.properties[divisionIdProperty]?.toString())
    }

    const value = currentGroupId?.sums.find(sum => sum.fieldName === fieldName)?.total

    if (value !== undefined && !isNaN(maxValue) && !isNaN(minValue) && maxValue !== minValue) {
      const percentage = Math.max(
        0,
        Math.min(100, ((value - minValue) / (maxValue - minValue)) * 100)
      )

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
    console.log('filteredData:')
    console.log(filteredData)
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