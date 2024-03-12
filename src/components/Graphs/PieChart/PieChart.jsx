import PropTypes from 'prop-types'
import { useMemo, useRef } from "react"
import * as d3 from "d3"

import { checkAggregation } from '@/helpers'

const MARGIN_X = 150
const MARGIN_Y = 50
const INFLEXION_PADDING = 20

const colors = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]

function PieChart({ 
  width, 
  height, 
  data,
  division, 
  aggregation,
  xAxis,
  yAxis 
}) {
  const ref = useRef(null)

  const aggregatedData = useMemo(() => {
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
        acc[name] = aggregation === 'min' ? Infinity : (aggregation === 'avg' ? { count: 0, sum: 0 } : 0)
      }

      const filteredValues = cur.fields.filter(d => d.fieldName === yAxis)
      if (filteredValues.length > 0) {
        const value = filteredValues[0]
        acc[name] = checkAggregation(value, acc[name], aggregation)
      }
      return acc
    }, {})

    if (aggregation === 'avg') {
      return Object.entries(sums).map(([name, info]) => ({ name, value: info.sum / info.count }))
    } else {
      return Object.entries(sums).map(([name, value]) => ({ name, value }))
    }
  }, [data, xAxis, yAxis, division, aggregation])

  const radius = Math.min(width - 2 * MARGIN_X, height - 2 * MARGIN_Y) / 2

  const pie = useMemo(() => {
    const pieGenerator = d3.pie().value((d) => d.value)
    return pieGenerator(aggregatedData)
  }, [aggregatedData])

  const arcPathGenerator = d3.arc()

  const shapes = pie.map((grp, i) => {
    const sliceInfo = {
      innerRadius: 0,
      outerRadius: radius,
      startAngle: grp.startAngle,
      endAngle: grp.endAngle,
    }

    const centroid = arcPathGenerator.centroid(sliceInfo)
    const slicePath = arcPathGenerator(sliceInfo)

    const inflexionInfo = {
      innerRadius: radius + INFLEXION_PADDING,
      outerRadius: radius + INFLEXION_PADDING,
      startAngle: grp.startAngle,
      endAngle: grp.endAngle,
    }

    const inflexionPoint = arcPathGenerator.centroid(inflexionInfo)

    const isRightLabel = inflexionPoint[0] > 0
    const labelPosX = inflexionPoint[0] + 50 * (isRightLabel ? 1 : -1)
    const textAnchor = isRightLabel ? "start" : "end"
    const label = grp.data.name + " (" + grp.value.toLocaleString() + ")"


    return (
      <g
        key={i}
        className='transition-opacity duration-300 opacity-100 cursor-pointer hover:opacity-60'
        onMouseEnter={() => {
          if (ref.current) {
            ref.current.classList.add('transition-opacity duration-300 opacity-20')
          }
        }}
        onMouseLeave={() => {
          if (ref.current) {
            ref.current.classList.remove('transition-opacity duration-300 opacity-20')
          }
        }}
      >
        <path d={slicePath} fill={colors[i]} />
        <circle cx={centroid[0]} cy={centroid[1]} r={2} />
        <line
          x1={centroid[0]}
          y1={centroid[1]}
          x2={inflexionPoint[0]}
          y2={inflexionPoint[1]}
          stroke={"black"}
          fill={"black"}
        />
        <line
          x1={inflexionPoint[0]}
          y1={inflexionPoint[1]}
          x2={labelPosX}
          y2={inflexionPoint[1]}
          stroke={"black"}
          fill={"black"}
        />
        <text
          x={labelPosX + (isRightLabel ? 2 : -2)}
          y={inflexionPoint[1]}
          textAnchor={textAnchor}
          dominantBaseline="middle"
          fontSize={14}
        >
          {label}
        </text>
      </g>
    )
  })

  return (
    <svg
      width={width} 
      height={height}
      className='bg-red-200'
    >
      <g
        transform={`translate(${width / 2}, ${height / 2})`}
        className='transition duration-300 opacity-100 cursor-pointer'
        ref={ref}
      >
        {shapes}
      </g>
    </svg>
  )
}

PieChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.array,
  regions: PropTypes.array,
  fields: PropTypes.array,
  options: PropTypes.array,
  division: PropTypes.string,
  aggregation: PropTypes.string,
  xAxis: PropTypes.string,
  yAxis: PropTypes.string
}

export default PieChart
