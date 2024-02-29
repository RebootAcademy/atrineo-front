import PropTypes from 'prop-types'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '../../ui/Select/Select'
import { Card, CardHeader } from '../../ui/Card/Card'
import { Label } from '../../ui/Label/Label'
import { Input } from '../../ui/Input/input'

function OptionsMenu({ onChange, fields, options, aggOptions, changeAggregation, changeXAxis, changeYAxis }) {
  const graphTypes = ['bar', 'pie']

  fields = fields.map(f => f.fieldName)

  const handleChange = (value) => {
    onChange(value)
  }

  const displayOptions = (options) => {
    return options.map((o, i) => 
      <SelectItem
        key={i}
        value={o}
      >
        { o }
      </SelectItem>
    )
  }

  const handleYAxis = (value) => {
    changeYAxis(value)
  }

  const handleXAxis = (value) => {
    changeXAxis(value)
  }

  const handleAggregation = (value) => {
    changeAggregation(value)
  }

  return (
    <Card
      className='h-full w-1/4'
    >
      <CardHeader className="font-medium">
        Chart Data
      </CardHeader>
      <Select
        onValueChange={handleChange}
      >
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Select a chart type" />
        </SelectTrigger>
        <SelectContent>
          { displayOptions(graphTypes) }
        </SelectContent>
      </Select>
      <Select
        onValueChange={handleYAxis}
      >
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="yAxis" />
          <SelectContent>
            {displayOptions(fields)}
          </SelectContent>
        </SelectTrigger>
      </Select>
      <Select
        onValueChange={handleXAxis}
      >
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="xAxis" />
          <SelectContent>
            {displayOptions(options)}
          </SelectContent>
        </SelectTrigger>
      </Select>
      <Select
        onValueChange={handleAggregation}
      >
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Aggregation" />
          <SelectContent>
            {displayOptions(aggOptions)}
          </SelectContent>
        </SelectTrigger>
      </Select>
    </Card>
  )
}

OptionsMenu.propTypes = {
  onChange: PropTypes.func,
  fields: PropTypes.array,
  options: PropTypes.array,
  division: PropTypes.string,
  aggOptions: PropTypes.array,
  changeAggregation: PropTypes.func,
  changeXAxis: PropTypes.func,
  changeYAxis: PropTypes.func
}

export default OptionsMenu