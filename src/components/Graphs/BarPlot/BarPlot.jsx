import PropTypes from 'prop-types'
import { useMemo, useContext } from 'react'
import * as d3 from "d3" // we will need d3.js

import { LocationContext } from '@/context/locationContext'
import { CollectionContext } from '@/context/collectionContext'
// import { LayerContext } from '@/context/layerContext'

import { 
  calcAggregatedData, 
  createStringOptionsObject, 
  formatNumber, 
  extractRegionNames 
} from '@/helpers'

function Barplot({
  width,
  height,
  data,
  options,
  aggregation,
  xAxis,
  yAxis,
  name,
  division
}) {
  const { locations } = useContext(LocationContext)
  const { collection } = useContext(CollectionContext)
  const regions = extractRegionNames(collection, division, locations)
  //const regions = locations[division].map(l => l.name)
  //const { mapDivision } = useContext(LayerContext)
  const mapDivision = division

  const MARGIN = { top: 60, right: 40, bottom: 80, left: 90 }
  const BAR_PADDING = 0.2
  const boundsWidth = width - MARGIN.right - MARGIN.left
  const boundsHeight = height - MARGIN.top - MARGIN.bottom

  const xFieldValues = createStringOptionsObject(options, data)

  xFieldValues.regions = regions

  const aggregatedData = useMemo(() => {
    const result = calcAggregatedData(data, xAxis, yAxis, mapDivision, aggregation, locations[mapDivision])

    return regions.map(region => result.find(d => d.name === region) || { name: region, sum: 0 })
  }, [data, xAxis, yAxis, aggregation, locations, mapDivision, regions])

  const maxSum = useMemo(() => Math.max(...aggregatedData.map(d => d.sum)), [aggregatedData])

  console.log(aggregatedData)

  const xScale = useMemo(() => {
    if (yAxis === 'regions') {
      return d3
        .scaleLinear()
        .domain([0, maxSum])
        .range([0, boundsWidth])
    } else {
      const domainValues = xFieldValues[xAxis] ? xFieldValues[xAxis].map(value => String(value)) : []
      return d3
        .scaleBand()
        .domain(domainValues)
        .range([0, boundsWidth])
        .padding(BAR_PADDING)
    }
  }, [xAxis, yAxis, boundsWidth, xFieldValues, maxSum])

  const yScale = useMemo(() => {
    if (yAxis === 'regions') {
      return d3
        .scaleBand()
        .domain(regions.map(value => String(value)))
        .range([0, boundsHeight])
        .padding(BAR_PADDING)
    } else {
      return d3
        .scaleLinear()
        .domain([0, maxSum])
        .range([boundsHeight, 0])
    }
  }, [yAxis, regions, maxSum, boundsHeight])

  const xAxisInfo = useMemo(() => {
    if (yAxis === 'regions') {
      return d3.axisBottom(xScale).tickFormat(d => formatNumber(d))
    } else {
      return d3.axisBottom(xScale)
    }
  }, [xScale, yAxis])

  const yAxisInfo = useMemo(() => {
    if (yAxis === 'regions') {
      return d3.axisLeft(yScale)
    } else {
      return d3.axisLeft(yScale).tickFormat(d => formatNumber(d))
    }
  }, [yScale, yAxis])

  const bars = useMemo(() => aggregatedData.map((d, i) =>
    <rect
      key={i}
      x={yAxis === 'regions' ? 0 : xScale(d.name)}
      y={yAxis === 'regions' ? yScale(d.name) : yScale(d.sum)}
      width={yAxis === 'regions' ? xScale(d.sum) : xScale.bandwidth()}
      height={yAxis === 'regions' ? yScale.bandwidth() : boundsHeight - yScale(d.sum)}
      fill={'var(--primary)'}
    />
  ), [xScale, yScale, aggregatedData, boundsHeight, yAxis])

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
        {/*Legend*/}
        <g
          transform={`translate(${boundsWidth + MARGIN.right - boundsWidth},${MARGIN.top - 18})`}
        >
          <g transform={`translate(0,0)`}>
            <rect width={15} height={15} fill={'var(--primary)'} />
            <text x={15 + 5} y={17 - 5} style={{ fontSize: '0.8em', fontWeight: 'bold' }}>
              {yAxis === 'regions' ? xAxis : yAxis}
            </text>
          </g>
        </g>
        <g transform={`translate(${MARGIN.left},${MARGIN.top + 44})`}>
          {bars}
          {/* Render X Axis */}
          <g
            transform={yAxis === 'regions' ? `translate(0,${boundsHeight})` : `translate(0,${boundsHeight})`} // Corrected line
            ref={node => d3.select(node).call(xAxisInfo)}
            className="x-axis"
          />
          {/* Render Y Axis */}
          <g
            transform={`translate(0,0)`} // Corrected line
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
