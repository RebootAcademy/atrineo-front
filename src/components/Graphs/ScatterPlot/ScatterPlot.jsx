import { useMemo } from 'react'
import { extractNumericFields, formatNumber } from '@/helpers'

import PropTypes from 'prop-types'
import * as d3 from 'd3'

function ScatterPlot({ 
  width,
  height,
  data,
  xAxis,
  yAxis,
  zAxis,
  name,
  colTypes
}) {

  const MARGIN = { top: 20, right: 20, bottom: 60, left: 70 }
  const boundsWidth = width - MARGIN.left - MARGIN.right
  const boundsHeight = height - MARGIN.top - MARGIN.bottom

  const filteredData = useMemo(() => {
    return data
      .map((item) => {
        const numericFields = extractNumericFields(item.fields, colTypes)
        const numericFieldsObj = numericFields.reduce((acc, field) => {
          acc[field.fieldName] = field.fieldValue
          return acc
        }, {})
        return numericFieldsObj
      })
      .filter((d) => d[xAxis] !== 0 && d[yAxis] !== 0)
      .filter((d) => !zAxis || (d[zAxis] !== null && d[zAxis] !== 0))
  }, [data, zAxis, yAxis, xAxis, colTypes])

  const xScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain(d3.extent(filteredData, d => d[xAxis]))
      .range([0, boundsWidth])
      .nice()
  }, [filteredData, xAxis, boundsWidth])

  const yScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain(d3.extent(filteredData, d => d[yAxis]))
      .range([boundsHeight, 0])
      .nice()
  }, [filteredData, yAxis, boundsHeight])

  const zScale = useMemo(() => {
    if (!zAxis) return null
    const [min, max] = d3.extent(filteredData, d => d[zAxis])
    return d3.scaleLinear()
      .domain([min, max])
      .range([1, 20])
  }, [filteredData, zAxis])

  const xAxisCall = d3.axisBottom(xScale).tickFormat(d => formatNumber(d))
  const yAxisCall = d3.axisLeft(yScale).tickFormat(d => formatNumber(d))

  const circles = filteredData.map((d, i) => {
    const radius = zScale ? zScale(d[zAxis]) : 5
    return (
      <circle
        key={i}
        cx={xScale(d[xAxis])}
        cy={yScale(d[yAxis])}
        r={radius}
        fill={'var(--primary)'}
        fillOpacity={0.5}
        stroke='black'
        strokeWidth={1}
      />
    )
  })

  return (
    <svg
      width={width}
      height={height}
      className="border rounded-md border-gray"
    >
      <text x={20} y={25} style={{ fontSize: '1em' }}>
        {name}
      </text>
      <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
        {circles}
        <g
          transform={`translate(0,${boundsHeight})`}
          ref={(node) => d3.select(node).call(xAxisCall)}
        />
        <g ref={(node) => d3.select(node).call(yAxisCall)} />
        <text
          transform={`translate(${boundsWidth / 2},${
            boundsHeight + MARGIN.bottom - 20
          })`}
          textAnchor="middle"
        >
          {xAxis}
        </text>
        <text
          transform="rotate(-90)"
          y={0 - MARGIN.left}
          x={0 - boundsHeight / 2}
          dy="1em"
          textAnchor="middle"
        >
          {yAxis}
        </text>
        {zAxis && (
          <text
            x={boundsWidth}
            y={boundsHeight + 50}
            textAnchor="end"
            alignmentBaseline="ideographic"
          >
            {`z axis: ${zAxis}`}
          </text>
        )}
      </g>
    </svg>
  )
}

ScatterPlot.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.array,
  xAxis: PropTypes.string,
  yAxis: PropTypes.string,
  zAxis: PropTypes.string,
  name: PropTypes.string,
  colTypes: PropTypes.object
}

export default ScatterPlot
