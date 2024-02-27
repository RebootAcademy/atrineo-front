import PropTypes from 'prop-types'
import * as d3 from "d3" // we will need d3.js

import BarItem from '../BarItem/BarItem'

import { findMaxAndMinValues } from '../../../helpers'

function Barplot ({ width, height, data, regions }) {

  console.log(data)
  console.log(regions)

  return (
    <div>
      <svg width={width} height={height}>

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