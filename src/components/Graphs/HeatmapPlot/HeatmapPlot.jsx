import { useRef, useMemo, useEffect } from "react"
import { extractNumericFields, formatNumber } from "@/helpers"

import * as Plot from "@observablehq/plot"
import PropTypes from 'prop-types'

function HeatmapPlot({
  width,
  height,
  data, 
  xAxis, 
  yAxis, 
  zAxis 
}) {

  const containerRef = useRef()

  const filteredData = useMemo(() => data.map(item => {
    const numericFields = extractNumericFields(item.fields)
    const numericFieldsObj = numericFields.reduce((acc, field) => {
      acc[field.fieldName] = field.fieldValue
      return acc
    }, {})
    return numericFieldsObj
  }), [data])

  useEffect(() => {
    if (filteredData) {
      const validData = filteredData.filter(d => d[zAxis] !== null && d[zAxis] !== 0)

      const yStep = 10
      const yValues = [...new Set(validData.map((d) => d[yAxis]))]
        .sort((a, b) => b - a)
        .filter((_, index) => index % yStep === 0)
      const xStep = 50
      const xValues = validData
        .map((d) => d[xAxis])
        .sort((a, b) => a - b)
        .filter((_, index) => index % xStep === 0)

      const plot = Plot.plot({
        width: width,
        height: height,
        marginLeft: 60,
        marginBottom: 60,
        padding: 0,
        y: {
          label: yAxis,
          domain: yValues,
          tickFormat: formatNumber,
        },
        x: {
          label: xAxis,
          domain: xValues,
          tickRotate: -45,
          tickSize: 5,
          tickFormat: formatNumber,
        },
        color: {
          scheme: "Blues",
          legend: true,
          zero: false,
        },
        marks: [
          Plot.cell(
            validData,
            Plot.group(
              { fill: "sum" }, // Sustituir por aggregation
              {
                x: (d) => d[xAxis],
                y: (d) => d[yAxis],
                fill: (d) => d[zAxis],
                inset: 0.5,
                sort: { y: "fill" },
              }
            )
          ),
        ],
      })
      containerRef.current.innerHTML = ''
      containerRef.current.appendChild(plot)
    }
  }, [filteredData, xAxis, yAxis, zAxis, height, width])

  return (
    <div className='border rounded-md border-gray px-4' ref={containerRef}></div>
  )
}

HeatmapPlot.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.array,
  xAxis: PropTypes.string,
  yAxis: PropTypes.string,
  zAxis: PropTypes.string
}


export default HeatmapPlot