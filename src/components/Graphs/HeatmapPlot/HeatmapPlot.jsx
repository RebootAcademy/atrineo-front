import { useRef, useMemo, useEffect } from "react"
import { extractNumericFields } from "@/helpers"

import * as Plot from "@observablehq/plot"
import PropTypes from 'prop-types'

function HeatmapPlot({
/*   width,
  height, */
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

  console.log(filteredData)

  useEffect(() => {
    if (filteredData) {
      const plot = Plot.plot({
        marginLeft: 120,
        padding: 0,
        y: { label: yAxis },
        color: { scheme: "turbo", legend: true, zero: true },
        marks: [
          Plot.cell(
            filteredData,
            Plot.group(
              { fill: "median" },
              { x: (d) => d[xAxis],
                y: (d) => d[yAxis], 
                fill: (d) => d[zAxis], 
                inset: 0.5, 
                sort: { y: "fill" } }
            )
          )
        ]
      })
      containerRef.current.innerHTML = ''
      containerRef.current.appendChild(plot)
    }
  }, [filteredData, xAxis, yAxis, zAxis])

  return (
    <div ref={containerRef}></div>
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