import { useMemo } from 'react'
import { calcAggregatedData, extractNumericFields, formatNumber } from '@/helpers'

import PropTypes from 'prop-types'
import * as d3 from 'd3'

function ScatterPlot({ 
  width,
  height,
  data,
  xAxis,
  yAxis,
  aggregation,
  division,
}) {

  const aggregatedData = useMemo(() => calcAggregatedData(data, xAxis, yAxis, division, aggregation), [data, xAxis, yAxis, division, aggregation]) 
  // const maxSum = useMemo(() => Math.max(...aggregatedData.map(d => d.sum)), [aggregatedData])

  console.log(extractNumericFields)

  const MARGIN = { top: 20, right: 20, bottom: 60, left: 70 }
  const boundsWidth = width - MARGIN.left - MARGIN.right
  const boundsHeight = height - MARGIN.top - MARGIN.bottom

  /*   const filteredData = data.map(item => {
    const numericFields = extractNumericFields(item.fields)
    const numericFieldsObj = numericFields.reduce((acc, field) => {
      acc[field.fieldName] = field.fieldValue
      return acc
    }, {})
    return numericFieldsObj
  }) */

  const xScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain(d3.extent(aggregatedData, d => d[xAxis]))
      .range([0, boundsWidth])
      .nice()
  }, [aggregatedData, xAxis, boundsWidth])

  const yScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain(d3.extent(aggregatedData, d => d[yAxis]))
      .range([boundsHeight, 0])
      .nice()
  }, [aggregatedData, yAxis, boundsHeight])

  const xAxisCall = d3.axisBottom(xScale).tickFormat(d => formatNumber(d))
  const yAxisCall = d3.axisLeft(yScale).tickFormat(d => formatNumber(d))

  const circles = aggregatedData.map((d, i) => {
    return (
      <circle
        key={i}
        cx={xScale(d[xAxis])}
        cy={yScale(d[yAxis])}
        r={8}
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
      className='bg-red-200'
    >
      <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
        {circles}
        <g
          transform={`translate(0,${boundsHeight})`}
          ref={node => d3.select(node).call(xAxisCall)}
        />
        <g ref={node => d3.select(node).call(yAxisCall)} />
        <text
          transform={`translate(${boundsWidth / 2},${boundsHeight + MARGIN.bottom - 20})`}
          textAnchor="middle"
        >
          {xAxis}
        </text>
        <text
          transform="rotate(-90)"
          y={0 - MARGIN.left}
          x={0 - (boundsHeight / 2)}
          dy="1em"
          textAnchor="middle"
        >
          {yAxis}
        </text>
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
  regions: PropTypes.array,
  options: PropTypes.array,
  aggregation: PropTypes.string,
  division: PropTypes.string,
}

export default ScatterPlot
