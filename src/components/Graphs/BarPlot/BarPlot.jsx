import PropTypes from 'prop-types'
import { useMemo } from 'react'
import * as d3 from "d3" // we will need d3.js

import BarItem from '../BarItem/BarItem'

import { findMaxAndMinValues } from '../../../helpers'

const MARGIN = { top: 30, right: 30, bottom: 30, left: 30 }
const BAR_PADDING = 0.3

function Barplot ({ width, height, data, regions }) {

  const boundsWidth = width - MARGIN.right - MARGIN.left
  const boundsHeight = height - MARGIN.top - MARGIN.bottom

  const [max] = findMaxAndMinValues(data, 'patents')

  const xScale = useMemo(() => {
    return d3
      .scaleBand()
      .domain(regions)
      .range([0, boundsWidth])
      .padding(BAR_PADDING)
  }, [regions, boundsWidth])

  const yScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([0, max])
      .range([boundsHeight, 0])
  }, [max, boundsHeight])
  
  const allShapes = data.map((d, i) => {
    const x = xScale(d.name)
    if (x === undefined) {
      return null
    }

    return (
      <g key={i}>
        <rect
          x={xScale()}
          y={yScale(d.name)}
          width={xScale(d.value)}
          height={yScale.bandwidth()}
          opacity={0.7}
          stroke="#9d174d"
          fill="#9d174d"
          fillOpacity={0.3}
          strokeWidth={1}
          rx={1}
        />
        <text
          x={xScale()}
          y={yScale + yScale.bandwidth() / 2}
          textAnchor="end"
          alignmentBaseline="central"
          fontSize={12}
          opacity={xScale(d.value) > 90 ? 1 : 0}
        >
          {d.value}
        </text>
        <text
          x={xScale(0) + 7}
          y={yScale + yScale.bandwidth() / 2}
          textAnchor="start"
          alignmentBaseline="central"
          fontSize={12}
        >
          {d.name}
        </text>
      </g>
    )
  })

  const grid = yScale
    .ticks(5)
    .slice(1)
    .map((value, i) => (
      <g key={i}>
        <line
          y1={yScale(value)}
          y2={yScale(value)}
          x1={0}
          x2={boundsWidth}
          stroke="#808080"
          opacity={0.2}
        />
        <text
          x={yScale(value)}
          y={boundsWidth + 10}
          textAnchor="middle"
          alignmentBaseline="central"
          fontSize={9}
          stroke="#808080"
          opacity={0.8}
        >
          {value}
        </text>
      </g>
    ))

  return (
    <div>
      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          {grid}
          {allShapes}
        </g>
      </svg>
    </div>
  )
}

Barplot.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.array,
  regions: PropTypes.array
}

export default Barplot