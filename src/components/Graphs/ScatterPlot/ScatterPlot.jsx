import { useMemo } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

function ScatterPlot({ width,
  height,
  data,
  xValue,
  yValue
}) {

  const MARGIN = { top: 20, right: 20, bottom: 60, left: 70 }
  const boundsWidth = width - MARGIN.left - MARGIN.right
  const boundsHeight = height - MARGIN.top - MARGIN.bottom

  const xScale = useMemo(() => {
    return d3.scaleLinear()
      .domain(d3.extent(data, d => d[xValue]))
      .range([0, boundsWidth])
      .nice()
  }, [data, xValue, boundsWidth])

  const yScale = useMemo(() => {
    return d3.scaleLinear()
      .domain(d3.extent(data, d => d[yValue]))
      .range([boundsHeight, 0])
      .nice()
  }, [data, yValue, boundsHeight])

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
        {data.map((d, i) => (
          <circle
            key={i}
            cx={xScale(d[xValue])}
            cy={yScale(d[yValue])}
            r={5}
            fill={'var(--primary)'}
          />
        ))}
        <g
          transform={`translate(0,${boundsHeight})`}
          ref={node => d3.select(node).call(d3.axisBottom(xScale))}
        />
        <g ref={node => d3.select(node).call(d3.axisLeft(yScale))} />
        <text
          transform={`translate(${boundsWidth / 2},${boundsHeight + MARGIN.bottom - 20})`}
          textAnchor="middle"
        >
          {xValue}
        </text>
        <text
          transform="rotate(-90)"
          y={0 - MARGIN.left}
          x={0 - (boundsHeight / 2)}
          dy="1em"
          textAnchor="middle"
        >
          {yValue}
        </text>
      </g>
    </svg>
  )
}

ScatterPlot.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.array,
  xValue: PropTypes.string,
  yValue: PropTypes.string,
}

export default ScatterPlot
