import PropTypes from 'prop-types'
import { useMemo } from "react"
import * as d3 from "d3"
import { createStringOptionsObject } from '../../../helpers'

const MARGIN = 30

const colors = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]

const PieChart = ({ width, height, data, regions, fields, options, division }) => {
  const radius = Math.min(width, height) / 2 - MARGIN
  //const optionsArr = createStringOptionsObject(options, data)
  // console.log(regions)
  // console.log(fields)
  // console.log(division)

  // const filteredData = data.flatMap(item =>
  //   item.fields
  //     .filter(field => field.fieldType === 'number' && !["latitude", "longitude", "districtId"].includes(field.fieldName))
  //     .reduce((acc, field) => {
  //       acc[field.fieldName] = field.fieldValue
  //       return acc
  //     }, {})
  // )
  // console.log(filteredData)

  // const dataMapped = filteredData.map(field => field['gnp'])
  // //console.log(dataMapped)

  // const result = {}
  // regions.forEach(cur => {
  //   result[cur] = 0
  //   const filtered = data
  //     .filter(d => d.locationId[division]?.name === cur)
  //   const fieldsArr = filtered.map(d => d.fields)
  //   fieldsArr.forEach(i => {
  //     const [obj] = i.filter(f => f.fieldName === 'gnp')
  //     result[cur] = result[cur] + obj.fieldValue
  //   })
  // })

  console.log(result)

  const pie = useMemo(() => {
    const pieGenerator = d3.pie().value((d) => d)
    return pieGenerator(values)
  }, [values])

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
        <select>

        </select>
        option 2:
        <select>

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
