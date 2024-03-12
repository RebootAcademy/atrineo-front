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
    {name:'pie', img: '/pieChart.svg'},
    {name: 'scatter', img: ''},
    {name:'stack', img: ''}
  ]

  const [chartName, setChartName] = useState('')
  const [/* selectedXAxis */, setSelectedXAxis] = useState('')
  const [/* selectedYAxis */, setSelectedYAxis] = useState('')
 
  fields = fields.map(f => f.fieldName)

  const handleChange = (value) => {
    onChange(value)
    setChartName(value)
  }

  const displayChartOptions = (options) => {
    return options.map((option, i) => 
      <SelectItem key={i} value={option.name}>
        <div className='flex'>
          <img src={option.img} className='mr-2' />
          { option.name }
        </div>
      </SelectItem>
    )
  }

  /*   const displayOptions = (options) => {
    return options.map((option, i) =>
      <SelectItem key={i} value={option}>
        {option} Hola
      </SelectItem>
    )
  } */

  const handleYAxis = (value) => {
    setSelectedYAxis(value)
    changeYAxis(value)
  }

  const handleXAxis = (value) => {
    setSelectedXAxis(value)
    changeXAxis(value)
  }

  const handleAggregation = (value) => {
    changeAggregation(value)
  }

  const handleName = (e) => {
    setChartName(e.target.value)
  }
  
  const displaySelect = (title, fn, arr, isNumeric = false) => {
    let filteredOptions = arr
    if (chartName === 'scatter' && isNumeric) {
      filteredOptions = fields
    } 
      
    return (
      <>
        <Label className="self-start ml-4 mt-4">
          {title}
        </Label>
        <Select onValueChange={fn}>
          <SelectTrigger className="w-5/6 mt-2">
            <SelectValue defaultValue={arr[0]} placeholder={arr[0]} />
            <SelectContent>
              {filteredOptions.map((option, i) => (
                <SelectItem key={i} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectTrigger>
        </Select>
      </>
    )
  }

  return (
    <Card className='flex flex-col h-full items-center rounded-sm'>
      <CardHeader className="font-medium self-start">
        Chart Data
      </CardHeader>
      <Label className="self-start ml-4 mt-4">
        Chart Name:
      </Label>
      <Input className="w-5/6 m-3.5" value={chartName} onChange={handleName}/>
      <Select onValueChange={handleChange}>
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
      { displaySelect('X axis:', handleXAxis, options, true) }
      { displaySelect('Y axis:', handleYAxis, fields, true) }
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