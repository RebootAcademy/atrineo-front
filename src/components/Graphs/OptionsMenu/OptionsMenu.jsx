import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

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
  ]

  const [chartName, setChartName] = useState('')
  const [selectedXAxis, setSelectedXAxis] = useState('')
  const [selectedYAxis, setSelectedYAxis] = useState('')

  useEffect(() => {
    if (chartName === 'bar') {
      setSelectedXAxis('')
      setSelectedYAxis('')
    }
  }, [chartName])
 
  fields = fields.map(f => f.fieldName)

  /*   const displayOptions = (options) => {
    return options.map((option, i) =>
    <SelectItem key={i} value={option}>
    {option} Hola
    </SelectItem>
    )
  } */

  const handleChange = (value) => {
    onChange(value)
    setChartName(value)
  }
  
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
  
  const displaySelect = (title, fn, arr, isNumeric = false, excludeOption = '') => {
    let filteredOptions = arr.filter(option => option !== excludeOption)

    if (chartName === 'scatter' && isNumeric) {
      filteredOptions = fields.filter(option => option !== excludeOption)
    } 

    const placeholder = title !== 'Aggregation:' ? arr[0] : 'Select option'
      
    return (
      <>
        <Label className="self-start ml-4 mt-4">
          {title}
        </Label>
        <Select onValueChange={fn}>
          <SelectTrigger className="w-5/6 mt-2">
            <SelectValue placeholder={placeholder} defaultValue={arr[0]} />
            <SelectContent key={`select-content-${title}`}>
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
          <SelectValue placeholder="Select chart type" />
        </SelectTrigger>
        <SelectContent>
          { displayChartOptions(graphTypes) }
        </SelectContent>
      </Select>

      { displaySelect('Aggregation:', handleAggregation, aggOptions) }

      <Label className="self-start ml-4 mt-4">
        Axes:
      </Label>
      { displaySelect('X axis:', handleXAxis, options, true, selectedYAxis) }
      { displaySelect('Y axis:', handleYAxis, fields, true, selectedXAxis)   }
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