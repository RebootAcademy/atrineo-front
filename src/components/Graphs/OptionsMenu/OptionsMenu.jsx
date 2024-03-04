import PropTypes from 'prop-types'
import { useState } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../ui/Select/Select'
import { Card, CardHeader } from '../../ui/Card/Card'
import { Label } from '../../ui/Label/Label'
import { Input } from '../../ui/Input/input'

function OptionsMenu({ onChange, fields, options, aggOptions, changeAggregation, changeXAxis, changeYAxis }) {
  const graphTypes = [
    {name:'bar', img: '/barChart.svg'}, 
    {name:'pie', img: '/pieChart.svg'}
  ]

  const [chartName, setChartName] = useState('')

  fields = fields.map(f => f.fieldName)

  const handleChange = (value) => {
    onChange(value)
  }

  const displayChartOptions = (options) => {
    return options.map((o, i) => 
      <SelectItem
        key={i}
        value={o.name}
      >
        <div className='flex'>
          <img
            src={o.img}
            className='mr-2'
          />
          { o.name }
        </div>
      </SelectItem>
    )
  }

  const displayOptions = (options) => {
    return options.map((o, i) =>
      <SelectItem
        key={i}
        value={o}
      >
        {o}
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

  const handleName = (e) => {
    setChartName(e.target.value)
  }

  const displaySelect = (title, fn, arr) => {
    return (
      <>
        <Label className="self-start ml-4 mt-4">
          {title}
        </Label>
        <Select
          onValueChange={fn}
        >
          <SelectTrigger className="w-5/6 mt-2">
            <SelectValue defaultValue={arr[0]} placeholder={arr[0]} />
            <SelectContent>
              {displayOptions(arr)}
            </SelectContent>
          </SelectTrigger>
        </Select>
      </>

    )
  }

  return (
    <Card
      className='h-full w-1/4 flex flex-col items-center ml-4'
    >
      <CardHeader className="font-medium self-start">
        Chart Data
      </CardHeader>
      <Label className="self-start ml-4 mt-4">
        Chart Name:
      </Label>
      <Input className="w-5/6 m-3.5" value={chartName} onChange={handleName}/>
      <Select
        onValueChange={handleChange}
      >
        <SelectTrigger className="w-5/6">
          <SelectValue placeholder="Select a chart type" />
        </SelectTrigger>
        <SelectContent>
          { displayChartOptions(graphTypes) }
        </SelectContent>
      </Select>

      { displaySelect('Aggregation:', handleAggregation, aggOptions) }

      <Label className="self-start ml-4 mt-4">
        Axes:
      </Label>

      { displaySelect('X axis:', handleXAxis, options) }
      { displaySelect('Y axis:', handleYAxis, fields) }
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