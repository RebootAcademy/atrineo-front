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
  zAxis,
  name,
  colTypes
}) {
  const containerRef = useRef()

  const filteredData = useMemo(() => data.map(item => {
    const numericFields = extractNumericFields(item.fields, colTypes)
    const numericFieldsObj = numericFields.reduce((acc, field) => {
      acc[field.fieldName] = field.fieldValue
      return acc
    }, {})
    return numericFieldsObj
  }), [data, colTypes])

  useEffect(() => {
    if (filteredData) {
      const validData = filteredData.filter((d) => d[zAxis] !== null && d[zAxis] !== 0)

      const xRange =
        Math.max(...validData.map((d) => d[xAxis])) -
        Math.min(...validData.map((d) => d[xAxis]))
      const yRange =
        Math.max(...validData.map((d) => d[yAxis])) -
        Math.min(...validData.map((d) => d[yAxis]))

      // Ajustar xStep e yStep basado en el rango
      const xStep = xRange / 100
      const yStep = yRange / 10

      const groupedData = {}

      validData.forEach((d) => {
        const xGroup = parseFloat((Math.floor(d[xAxis] / xStep) * xStep).toFixed(2))
        const yGroup = parseFloat((Math.floor(d[yAxis] / yStep) * yStep).toFixed(2))
        const key = `${xGroup}-${yGroup}`

        if (!groupedData[key]) {
          groupedData[key] = {
            ...d,
            [xAxis]: xGroup,
            [yAxis]: yGroup,
            [zAxis]: 0,
            count: 0,
          }
        }
        groupedData[key][zAxis] += d[zAxis]
        groupedData[key].count += 1
      })

      const dataForPlotting = Object.values(groupedData).map((group) => ({
        ...group,
        [zAxis]: group[zAxis] / group.count,
      }))

      const xValues = [...new Set(dataForPlotting.map((d) => d[xAxis]))].sort(
        (a, b) => a - b
      )
      const yValues = [...new Set(dataForPlotting.map((d) => d[yAxis]))].sort(
        (a, b) => b - a
      )

      const plot = Plot.plot({
        width: width,
        height: height - 60,
        marginLeft: 80,
        marginBottom: 40,
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
          label: zAxis,
          tickFormat: formatNumber,
        },
        title: name,
        marks: [
          Plot.cell(
            dataForPlotting,
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
      containerRef.current.innerHTML = ""
      containerRef.current.appendChild(plot)
    }
  }, [filteredData, xAxis, yAxis, zAxis, height, width, name])

  return (
    <div 
      className='border rounded-md border-gray p-4'
      ref={containerRef}
      style={{ width: `${width}px`, height: `${height}px` }}
    ></div>
  )
}

HeatmapPlot.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.array,
  xAxis: PropTypes.string,
  yAxis: PropTypes.string,
  zAxis: PropTypes.string,
  name: PropTypes.string,
  colTypes: PropTypes.object
}


export default HeatmapPlot