import { useContext, useEffect, useState } from "react"

import BarPlot from '../components/Graphs/BarPlot/BarPlot'
import PieChart from "../components/Graphs/PieChart/PieChart"
import OptionsMenu from "../components/Graphs/OptionsMenu/OptionsMenu"

import { CollectionContext } from "../context/collectionContext"
import { LayerContext } from "../context/layerContext"

import {
  extractRegionNames,
  extractNumericFields,
  extractStringOptions,
  extractBooleanOptions
} from "../helpers"

function Statistics() {
  const { collection } = useContext(CollectionContext)
  const { mapDivision } = useContext(LayerContext)

  let fields
  let data
  if (collection.length !== 0) {
    data = collection[0]?.data
    fields = extractNumericFields(data[0].fields)
  }
  let stringOptions
  let booleanOptions
  let optionsArr
  if (data) {
    stringOptions = extractStringOptions(data[0].fields)
    booleanOptions = extractBooleanOptions(data[0].fields)
    optionsArr = ['regions', ...stringOptions, ...booleanOptions]
  }
  console.log(data)

  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)
  const [chartType, setChartType] = useState('')
  const [aggregation, setAggregation] = useState('sum')
  const [yAxis, setYAxis] = useState(fields[0].fieldName)
  const [xAxis, setXAxis] = useState(optionsArr[0])

  console.log(xAxis)
  console.log(yAxis)


  const aggOptions = ['sum', 'avg', 'count', 'min', 'max']

  useEffect(() => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }, [width, height])


  const regionNames = extractRegionNames(collection, mapDivision)

  const changeChartType = (type) => {
    setChartType(type)
  }

  const changeAggregation = (value) => {
    setAggregation(value)
  }

  const changeXAxis = (name) => {
    setXAxis(name)
  }

  const changeYAxis = (name) => {
    setYAxis(name)
  }

  const displayChart = () => {
    switch(chartType){
    case('bar'):
      return <BarPlot
        width={width * 0.75}
        height={height * 0.5}
        data={data}
        regions={regionNames}
        fields={fields}
        options={optionsArr}
        division={mapDivision}
        aggregation={aggregation}
        xAxis={xAxis}
        yAxis={yAxis}
        changeXAxis={changeXAxis}
        changeYAxis={changeYAxis}
      />
    case('pie'):
      return <PieChart
        width={width * 0.75}
        height={height * 0.8}
        data={data}
        regions={regionNames}
        fields={fields}
        options={optionsArr}
        division={mapDivision}
      />
    }
  }

  return (
    <div
      className="mt-[45px] h-4/5 flex"
    >
      {
        collection.length === 0 ?
          'Loading...' :
          <>
            {
              displayChart()
            }
            <OptionsMenu 
              onChange={changeChartType}
              fields={fields}
              options={optionsArr}
              aggOptions={aggOptions}
              changeAggregation={changeAggregation}
              changeXAxis={changeXAxis}
              changeYAxis={changeYAxis}
            />
          </>
      }

    </div>
  )
}

export default Statistics