import PropTypes from 'prop-types'
import { useMemo, useState } from 'react'
import * as d3 from "d3" // we will need d3.js

const MARGIN = { top: 30, right: 30, bottom: 30, left: 80 }
const BAR_PADDING = 0.3

function Barplot ({ width, height, data, regions, fields }) {

  const [field, setField] = useState(fields[0].fieldName)
  
  const boundsWidth = width - MARGIN.right - MARGIN.left
  const boundsHeight = height - MARGIN.top - MARGIN.bottom
  
  const handleChange = (e) => {
    setField(e.target.value)
  }

  const summedData = useMemo(() => {
    const sums = data.reduce((acc, cur) => {
      const name = cur.locationId.division3?.name
      if (!name) return acc
      if (!acc[name]) {
        acc[name] = 0
      }
      const [value] = cur.fields.filter(d => d.fieldName === field)
      acc[name] += value.fieldValue
      return acc
    }, {})
    return Object.entries(sums).map(([name, sum]) => ({ name, sum }))
  }, [data, field])

  const maxSum = useMemo(() => Math.max(...summedData.map(d => d.sum)), [summedData])

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
      .domain([0, maxSum])
      .range([boundsHeight, 0])
  }, [maxSum, boundsHeight])

  const xAxis = useMemo(() => d3.axisBottom(xScale), [xScale])
  const yAxis = useMemo(() => d3.axisLeft(yScale), [yScale])

  const bars = useMemo(() => summedData.map((d, i) => (
    <rect
      key={i}
      x={xScale(d.name)}
      y={yScale(d.sum)}
      width={xScale.bandwidth()}
      height={boundsHeight - yScale(d.sum)}
      fill="#9d174d"
    />
  )), [xScale, yScale, summedData, boundsHeight])

  return (
    <>
      <svg width={width} height={height}>
        <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
          {bars}
          {/* Render X Axis */}
          <g
            transform={`translate(0,${boundsHeight})`}
            ref={node => d3.select(node).call(xAxis)}
            className="x-axis"
          />
          {/* Render Y Axis */}
          <g
            ref={node => d3.select(node).call(yAxis)}
            className="y-axis"
          />
        </g>
      </svg>
      <select name="fields" id="field-select" onChange={handleChange}>
        {
          fields.map((f,i) => <option key={i} value={f.fieldName}>{f.fieldName}</option>)
        }
      </select>
    </>
  )
}

Barplot.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.array,
  regions: PropTypes.array,
  fields: PropTypes.array
}

export default Barplot