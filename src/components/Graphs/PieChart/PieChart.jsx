import PropTypes from 'prop-types'
import { useMemo, useState } from "react"
import * as d3 from "d3"

const MARGIN = 30

const colors = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]

const PieChart = ({ width, height, data, regions, fields, division }) => {
  const [option, setOption] = useState(fields[0].fieldName)
  console.log(option)

  const handleChange = (e) => {
    setOption(e.target.value)
  }

  const result = []
  regions.forEach(cur => {
    let sum = 0
    const filtered = data.filter(d => d.locationId[division]?.name === cur)
    const fieldsArr = filtered.map(d => d.fields)
    fieldsArr.forEach(i => {
      const [obj] = i.filter(f => f.fieldName === option)
      if (obj) {
        sum += obj.fieldValue
      }
    })
    result.push({ name: cur, value: sum })
  })

  console.log(result)

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
      <svg width={width} height={height} style={{ display: "inline-block" }}>
        <g transform={`translate(${width / 2}, ${height / 2})`}>
          {arcs.map((arc, i) => {
            return <path key={i} d={arc} fill={colors[i]} />
          })}
        </g>
      </svg>
      <div>
        option 1:
        <select onChange={handleChange}>
          {
            fields.map((f, i) => <option key={i} value={f.fieldName}>{f.fieldName}</option>)
          }
        </select>
      </div>
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
  division: PropTypes.string
}

export default PieChart
