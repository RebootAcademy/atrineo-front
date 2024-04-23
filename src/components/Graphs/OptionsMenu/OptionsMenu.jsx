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

function OptionsMenu({ onChange, fields, options, aggOptions, changeAggregation, changeXAxis, changeYAxis, changeZAxis, chartType, chartName, changeChartName, ownProps, toggleDisplay }) {
  const [selectedXAxis, setSelectedXAxis] = useState('')
  const [selectedYAxis, setSelectedYAxis] = useState('')
  const [selectedZAxis, setSelectedZAxis] = useState('')

  const { saveCurrentGraph } = useContext(GraphContext)

  const graphTypes = [
    {name: 'bar', img: '/barChart.svg'}, 
    {name: 'pie', img: '/pieChart.svg'},
    {name: 'scatter', img: '/scatter-chart.svg'},
    {name: 'heatmap', img: '/heatMap.svg'}
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

  const handleZAxisChange = (value) => {
    setSelectedZAxis(value)
    changeZAxis(value)
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
    hideOptions()
    changeChartName('')
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
  
  const displaySelect = (title, fn, arr, isNumeric = false, excludeOptions = [], currentValue) => {

    let filteredOptions = arr.filter(option => !excludeOptions.includes(option))

    if (chartType === 'scatter' && isNumeric) {
      filteredOptions = fields.filter(option => !excludeOptions.includes(option))
    }

    if (chartType === 'heatmap' && isNumeric) {
      filteredOptions = fields.filter(option => !excludeOptions.includes(option))
    } 

    const placeholder = title === 'Aggregation:' ? arr[0] : 'Please select an option'
      
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

  const hideOptions = () => {
    toggleDisplay(false)
  }

  return (
    <Card className="flex flex-col h-full items-center rounded-sm">
      <CardHeader className="font-medium self-start">Chart Data</CardHeader>
      <Label className="self-start ml-4 mt-4">Chart Name:</Label>
      <Input
        className="w-5/6 m-3.5"
        value={chartName}
        onChange={handleNameChange}
      />
      <Select onValueChange={handleChange}>
        <SelectTrigger className="w-5/6">
          <SelectValue placeholder="Select chart type" />
        </SelectTrigger>
        <SelectContent>{displayChartOptions(graphTypes)}</SelectContent>
      </Select>
      {chartType !== "scatter" &&
        chartType !== "heatmap" &&
        displaySelect("Aggregation:", handleAggregationChange, aggOptions)}

      <Label className="self-start ml-4 mt-4">Axes:</Label>

      {displaySelect(
        "X axis:",
        handleXAxisChange,
        // options.filter(
        //   (option) => option !== "Status" && option !== "Branche_(WZ)"
        // ),
        [...options, ...fields],
        true,
        [selectedYAxis, selectedZAxis],
        selectedXAxis
      )}
      {displaySelect(
        "Y axis:",
        handleYAxisChange,
        fields,
        true,
        [selectedXAxis, selectedZAxis],
        selectedYAxis
      )}

      {chartType === "scatter" &&
        displaySelect(
          "Z axis:",
          handleZAxisChange,
          options,
          true,
          [selectedXAxis, selectedYAxis],
          selectedZAxis
        )}
      {chartType === "heatmap" &&
        displaySelect(
          "Z axis:",
          handleZAxisChange,
          options,
          true,
          [selectedXAxis, selectedYAxis],
          selectedZAxis
        )}

      <div className="mt-12 w-full flex justify-around">
        <CustomButton text="Cancel" variant="outline" fn={hideOptions} />
        <CustomButton text="Save" fn={handleSaveGraph} />
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
  changeZAxis: PropTypes.func,
  chartType: PropTypes.string, 
  chartName: PropTypes.string, 
  changeChartName: PropTypes.func, 
  ownProps: PropTypes.object,
  toggleDisplay: PropTypes.func
}

export default OptionsMenu