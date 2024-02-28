import PropTypes from 'prop-types'
import { useMemo } from "react"
import * as d3 from "d3"

const MARGIN = 30

const colors = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]

const PieChart = ({ width, height, data }) => {
  const radius = Math.min(width, height) / 2 - MARGIN

  const filteredData = data.flatMap(item =>
    item.fields
      .filter(field => field.fieldType === 'number' && !["latitude", "longitude", "districtId"].includes(field.fieldName))
      .reduce((acc, field) => {
        acc[field.fieldName] = field.fieldValue
        return acc
      }, {})
  )
  console.log(filteredData)

  const dataMapped = filteredData.map(field => field['gnp'])
  console.log(dataMapped)

  const pie = useMemo(() => {
    const pieGenerator = d3.pie().value((d) => d)
    return pieGenerator(dataMapped)
  }, [dataMapped])

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
      <svg width={width} height={height} style={{ display: "inline-block" }}>
        <g transform={`translate(${width / 2}, ${height / 2})`}>
          {arcs.map((arc, i) => {
            return <path key={i} d={arc} fill={colors[i]} />
          })}
        </g>
      </svg>
      <div>
        hola
      </div>
    </>
  )
}

PieChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.array,
  fields: PropTypes.array
}

export default PieChart
