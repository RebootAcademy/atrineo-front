import { useContext, useState } from 'react'

import { Card, CardHeader } from '../../ui/Card/Card'
import { Label } from '../../ui/Label/Label'
import { Input } from '../../ui/Input/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../ui/Select/Select'

import CustomButton from '@/components/CustomButton/CustomButton'

import PropTypes from 'prop-types'
import { GraphContext } from '@/context/graphContext'

function OptionsMenu({ onChange, fields, options, aggOptions, changeAggregation, changeXAxis, changeYAxis, chartType, chartName, changeChartName, ownProps }) {
  const [selectedXAxis, setSelectedXAxis] = useState('')
  const [selectedYAxis, setSelectedYAxis] = useState('')

  const { saveCurrentGraph } = useContext(GraphContext)

  const graphTypes = [
    {name:'bar', img: '/barChart.svg'}, 
    {name:'pie', img: '/pieChart.svg'},
    {name: 'scatter', img: '/scatter-chart.svg'},
  ]
 
  fields = fields.map(f => f.fieldName)

  const handleChange = (value) => {
    onChange(value)
  }
  
  const handleXAxisChange = (value) => {
    setSelectedXAxis(value)
    changeXAxis(value)
  }

  const handleYAxisChange = (value) => {
    setSelectedYAxis(value)
    changeYAxis(value)
  }
  
  const handleAggregationChange = (value) => {
    changeAggregation(value)
  }
  
  const handleNameChange = (e) => {
    changeChartName(e.target.value)
  }

  const handleSaveGraph = () => {
    const graphConfigurationObj = {
      chartName,
      chartType,
      selectedXAxis,
      selectedYAxis
    }
    saveCurrentGraph(graphConfigurationObj, ownProps)
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
  
  const displaySelect = (title, fn, arr, isNumeric = false, excludeOption = '', currentValue) => {
    let filteredOptions = arr.filter(option => option !== excludeOption)

    if (chartType === 'scatter' && isNumeric) {
      filteredOptions = fields.filter(option => option !== excludeOption)
    } 

    const placeholder = title !== 'Aggregation:' ? arr[0] : 'Select option'
      
    return (
      <>
        <Label className="self-start ml-4 mt-4">
          {title}
        </Label>
        <Select onValueChange={fn} value={currentValue} >
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
      <Input className="w-5/6 m-3.5" value={chartName} onChange={handleNameChange}/>
      <Select onValueChange={handleChange}>
        <SelectTrigger className="w-5/6">
          <SelectValue placeholder="Select chart type" />
        </SelectTrigger>
        <SelectContent>
          { displayChartOptions(graphTypes) }
        </SelectContent>
      </Select>

      {chartType !== 'scatter' && (
        displaySelect('Aggregation:', handleAggregationChange, aggOptions)
      )}

      <Label className="self-start ml-4 mt-4">
        Axes:
      </Label>
      { displaySelect('X axis:', handleXAxisChange, options, true, selectedYAxis, selectedXAxis) }
      { displaySelect('Y axis:', handleYAxisChange, fields, true, selectedXAxis, selectedYAxis)  }

      <div className='mt-12 ml-40'>
        <CustomButton text='Save' fn={handleSaveGraph} variant='' />
      </div>
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
  changeYAxis: PropTypes.func,
  chartType: PropTypes.string, // Adjust based on actual requirement (isRequired or not)
  chartName: PropTypes.string, // Adjust based on actual requirement
  changeChartName: PropTypes.func, // Assuming it's a function, adjust as needed
  ownProps: PropTypes.object
}

export default OptionsMenu