import { useContext, useEffect, useState } from "react"
import { useQuery } from "react-query"

import BarPlot from '../components/Graphs/BarPlot/BarPlot'
import PieChart from "../components/Graphs/PieChart/PieChart"
import OptionsMenu from "../components/Graphs/OptionsMenu/OptionsMenu"
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner"
import { Label } from "../components/ui/Label/Label"

import { CollectionContext } from "../context/collectionContext"
import { LayerContext } from "../context/layerContext"
import { UserContext } from "../context/userContext"

import { getOwnOrganizationCollections } from "../services/collectionService"
import { getOwnProfile } from "../services/userService"

import {
  extractRegionNames,
  extractNumericFields,
  extractStringOptions,
  extractBooleanOptions
} from "../helpers"

function Statistics() {
  const { collection, setCollection } = useContext(CollectionContext)
  const { mapDivision } = useContext(LayerContext)
  const { user, setUser } = useContext(UserContext)

  useQuery('profile', getOwnProfile, {
    enabled: !!user.name,
    onSuccess: (data) => {
      if (data && data.result) {
        setUser(data.result)
      }
    }
  })

  useQuery('organizationCollections', getOwnOrganizationCollections, {
    enabled: collection.length === 0 && user.name,
    onSuccess: (data) => {
      console.log(data)
      if (data && data[0]) {
        setCollection(data)
      }
    }
  })

  const data = collection[0]?.data
  const fields = data ? extractNumericFields(data[0]?.fields) : []
  const stringOptions = data ? extractStringOptions(data[0]?.fields) : []
  const booleanOptions = data ? extractBooleanOptions(data[0]?.fields) : []
  const optionsArr = data ? ['regions', ...stringOptions, ...booleanOptions] : []

  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)
  const [chartType, setChartType] = useState('')
  const [aggregation, setAggregation] = useState('sum')
  const [yAxis, setYAxis] = useState(fields.length > 0 ? fields[0].fieldName : '')
  const [xAxis, setXAxis] = useState(optionsArr.length > 0 ? optionsArr[0] : '')

  const aggOptions = ['sum', 'avg', 'count', 'min', 'max']

  useEffect(() => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }, [width, height])

  useEffect(() => {
    if (fields.length > 0) {
      setYAxis(fields[0].fieldName)
    }
  }, [fields])

  useEffect(() => {
    if (optionsArr.length > 0) {
      setXAxis(optionsArr[0])
    }
  }, [optionsArr])

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

  const commonProps = {
    width: width * 0.75,
    height: height * 0.75,
    data: data,
    regions: regionNames,
    options: optionsArr,
    division: mapDivision,
    aggregation: aggregation,
    xAxis: xAxis,
    yAxis: yAxis,
    changeXAxis: changeXAxis,
    changeYAxis: changeYAxis
  }

  const displayChart = () => {
    switch(chartType){
    case('bar'):
      return <BarPlot 
        {...commonProps} 
      />
    case('pie'):
      return <PieChart
        {...commonProps }
        fields={fields}
      />
    default:
      return <div
        className="w-3/4
          mr-4
          border-solid 
          border-gray 
          border-[1px] 
          rounded-md
          pt-4
          pl-4"
      >
        <Label className="text-lg">
          Preview Chart
        </Label>
      </div>
    }
  }

  return (
    <div
      className="mt-[45px] h-4/5 w-full flex mx-8"
    >
      {
        collection.length === 0 ?
          <LoadingSpinner /> :
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
              xAxis={xAxis}
              yAxis={yAxis}
            />
          </>
      }

    </div>
  )
}

export default Statistics