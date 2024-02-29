import PropTypes from 'prop-types'
import { useMemo } from "react"
import * as d3 from "d3"

const MARGIN = 30

const colors = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]

const PieChart = ({ 
  width, 
  height, 
  data, 
  regions, 
  fields, 
  division, 
  aggregation,
  xAxis,
  yAxis 
}) => {

  // const result = []
  // regions.forEach(cur => {
  //   let sum = 0
  //   const filtered = data.filter(d => d.locationId[division]?.name === cur)
  //   const fieldsArr = filtered.map(d => d.fields)
  //   fieldsArr.forEach(i => {
  //     const [obj] = i.filter(f => f.fieldName === yAxis)
  //     if (obj) {
  //       sum += obj.fieldValue
  //     }
  //   })
  //   result.push({ name: cur, value: sum })
  // })
  const checkAggregation = (value, prev, agg) => {
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

  const result = useMemo(() => {
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
      const [value] = cur.fields.filter(d => d.fieldName === yAxis)
      acc[name] = checkAggregation(value, acc[name], aggregation)
      return acc
    }, {})
    if (aggregation === 'avg') {
      return Object.entries(sums).map(([name, info]) => ({ name, value: info.sum / info.count }))
    } else {
      return Object.entries(sums).map(([name, value]) => ({ name, value }))
    }
  }, [data, xAxis, yAxis, division, aggregation])

  const radius = Math.min(width, height) / 2 - MARGIN

  const pie = useMemo(() => {
    const pieGenerator = d3.pie().value((d) => d.value)
    return pieGenerator(result)
  }, [result])

  const arcs = useMemo(() => {
    const arcPathGenerator = d3.arc()
    return pie.map((p) =>
      arcPathGenerator({
        innerRadius: 0,
        outerRadius: radius,
        startAngle: p.startAngle,
        endAngle: p.endAngle,
      })
    )
  }, [radius, pie])

  return (
    <>
      <svg 
        width={width} 
        height={height} 
        style={{ display: "inline-block" }}
        className='border-solid border-gray border-[1px] rounded-md h-full mr-4'>
        <g transform={`translate(${width / 2}, ${height / 2})`}>
          {arcs.map((arc, i) => {
            return <path key={i} d={arc} fill={colors[i]} />
          })}
        </g>
      </svg>
    </>
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
