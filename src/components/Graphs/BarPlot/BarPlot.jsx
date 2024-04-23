import PropTypes from 'prop-types'
import { useMemo, useContext } from 'react'
import * as d3 from "d3" // we will need d3.js

import { LocationContext } from '@/context/locationContext'
import { LayerContext } from '@/context/layerContext'

import { calcAggregatedData, createStringOptionsObject, formatNumber } from '@/helpers'

function Barplot({ 
  width, 
  height, 
  data, 
  regions,
  options,
  aggregation, 
  xAxis, 
  yAxis,
  name 
}) {
  const { locations } = useContext(LocationContext)
  const { mapDivision } = useContext(LayerContext)

  const MARGIN = { top: 60, right: 40, bottom: 80, left: 90 }
  const BAR_PADDING = 0.2
  const boundsWidth = width - MARGIN.right - MARGIN.left
  const boundsHeight = height - MARGIN.top - MARGIN.bottom

  const xFieldValues = createStringOptionsObject(options, data)
  console.log(xFieldValues)
  xFieldValues.regions = regions
  
  const aggregatedData = useMemo(() => calcAggregatedData(data, xAxis, yAxis, mapDivision, aggregation, locations[mapDivision]), [data, xAxis, yAxis, aggregation, locations, mapDivision]) 
  
  const maxSum = useMemo(() => Math.max(...aggregatedData.map(d => d.sum)), [aggregatedData])

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
  const yAxisInfo = useMemo(() => d3.axisLeft(yScale).tickFormat(d => formatNumber(d)), [yScale])

  const bars = useMemo(() => aggregatedData.map((d, i) =>
    <rect
      key={i}
      x={(xScale(d.name) || 0) + 20}
      y={yScale(d.sum)}
      width={xScale.bandwidth() - 40}
      height={boundsHeight - yScale(d.sum)}
      fill={'var(--primary)'}
    />
  ), [xScale, yScale, aggregatedData, boundsHeight])

  return (
    <>
      <svg 
        width={width} 
        height={height}
        className='border rounded-md border-gray'
      >
        <text x={20} y={25} style={{ fontSize: '1em' }}>
          {name}
        </text>
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
  yAxis: PropTypes.string,
  name: PropTypes.string
}

export default Barplot