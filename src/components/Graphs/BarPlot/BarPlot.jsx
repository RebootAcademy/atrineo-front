import PropTypes from 'prop-types'
import { useMemo } from 'react'
import * as d3 from "d3" // we will need d3.js

const MARGIN = { top: 60, right: 40, bottom: 80, left: 90 }
const BAR_PADDING = 0.2

import { createStringOptionsObject } from '../../../helpers'

function Barplot ({ 
  width, 
  height, 
  data, 
  regions, 
  options, 
  division, 
  aggregation, 
  xAxis, 
  yAxis 
}) {
  
  const xFieldValues = createStringOptionsObject(options, data)
  xFieldValues.regions = regions
  
  const boundsWidth = width - MARGIN.right - MARGIN.left
  const boundsHeight = height - MARGIN.top - MARGIN.bottom

  const checkAggregation = (value, prev, agg) => {
    if (!value) { return prev }
    switch (agg) {
    case ('sum'):
      return prev + value.fieldValue
    case ('count'):
      return ++prev
    case ('avg'):
      return { count: ++prev.count, sum: prev.sum + value.fieldValue }
    case ('max'):
      if (value.fieldValue > prev) return value.fieldValue
      return prev
    case ('min'):
      if (value.fieldValue < prev) return value.fieldValue
      return prev
    }
  }

  const summedData = useMemo(() => {
    const sums = data.reduce((acc, cur) => {
      let name
      if (xAxis === 'regions') {
        name = cur.locationId[division]?.name
      } else {
        name = cur.fields
          .filter(f => f.fieldName === xAxis)
          .map(f => f.fieldValue)
      }
      
      if (!name) return acc
      if (!acc[name]) {
        if (aggregation === 'avg') {
          acc[name] = {
            count: 0,
            sum: 0
          }
        } else if (aggregation !== 'min') {
          acc[name] = 0
        } else {
          const minValue = data[0].fields
            .filter(f => f.fieldName === yAxis)
            .map(i => i.fieldValue)
          acc[name] = minValue
        }
      }
      const filteredValues = cur.fields.filter(d => d.fieldName === yAxis)
      if (filteredValues.length > 0) {
        const value = filteredValues[0]
        acc[name] = checkAggregation(value, acc[name], aggregation )
      }
      return acc
    }, {})
    if (aggregation === 'avg') {
      return Object.entries(sums).map(([name, info]) => ({ name, sum: info.sum / info.count }))
    } else {
      return Object.entries(sums).map(([name, sum]) => ({ name, sum }))
    }
  }, [data, xAxis, yAxis, division, aggregation])
  const maxSum = useMemo(() => Math.max(...summedData.map(d => d.sum)), [summedData])

  const xScale = useMemo(() => {
    const domainValues = xFieldValues[xAxis] ? xFieldValues[xAxis].map(value => String(value)) : []
    return d3
      .scaleBand()
      .domain(domainValues)
      .range([0, boundsWidth])
      .padding(BAR_PADDING)
  }, [xAxis, boundsWidth, xFieldValues])

  const yScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([0, maxSum])
      .range([boundsHeight, 0])
  }, [maxSum, boundsHeight])

  const xAxisInfo = useMemo(() => d3.axisBottom(xScale), [xScale])
  const yAxisInfo = useMemo(() => d3.axisLeft(yScale), [yScale])

  const bars = useMemo(() => summedData.map((d, i) =>
    <rect
      key={i}
      x={xScale(d.name) + 20}
      y={yScale(d.sum)}
      width={xScale.bandwidth() - 40}
      height={boundsHeight - yScale(d.sum)}
      fill={'var(--primary)'}
    />
  ), [xScale, yScale, summedData, boundsHeight])

  return (
    <>
      <svg 
        width={width} 
        height={height}
        className='bg-red-200'
      >
        {/*Legend*/ }
        <g 
          transform={`translate(${boundsWidth + MARGIN.right - boundsWidth},${MARGIN.top - 18})`}
        >
          <g transform={`translate(0,0)`}>
            <rect width={15} height={15} fill={'var(--primary)'} />
            <text x={15 + 5} y={17 - 5} style={{ fontSize: '0.8em', fontWeight: 'bold' }}>
              {yAxis}
            </text>
          </g>
        </g>
        <g transform={`translate(${MARGIN.left},${MARGIN.top + 44})`}>
          {bars}
          {/* Render X Axis */}
          <g
            transform={`translate(0,${boundsHeight})`}
            ref={node => d3.select(node).call(xAxisInfo)}
            className="x-axis"
          />
          {/* Render Y Axis */}
          <g
            transform={`translate(0,0)`}
            ref={node => d3.select(node).call(yAxisInfo)}
            className="y-axis"
          />
        </g>
      </svg>
    </>
  )
}

Barplot.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.array,
  regions: PropTypes.array,
  options: PropTypes.array,
  division: PropTypes.string,
  aggregation: PropTypes.string,
  xAxis: PropTypes.string,
  yAxis: PropTypes.string
}

export default Barplot