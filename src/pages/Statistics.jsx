import { useContext, useEffect, useState, useMemo } from "react"
import { useQuery } from "react-query"

import OptionsMenu from "../components/Graphs/OptionsMenu/OptionsMenu"
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner"
import ChartsContainer from "@/components/Graphs/ChartsContainer/ChartsContainer"

import { CollectionContext } from "../context/collectionContext"
import { LayerContext } from "../context/layerContext"
import { UserContext } from "../context/userContext"

import { 
  getOwnOrganizationCollections, 
  getPublicCollections 
} from "../services/collectionService"

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
    enabled: !!user && !user.name,
    onSuccess: (data) => {
      if (data && data.result) {
        setUser(data.result)
      }
    }
  })

  useQuery('organizationCollections', getOwnOrganizationCollections, {
    enabled: !!user && Object.keys(user).length > 0 && collection.length === 0 && user.role && user.role !== 'wizard',
    onSuccess: (data) => {
      if (data && data[0]) {
        setCollection(data)
      }
    }
  })

  useQuery('publicCollections', getPublicCollections, {
    enabled: !!user && Object.keys(user).length > 0 && collection.length === 0 && user.role === 'wizard',
    onSuccess: (data) => {
      if (Object.keys(user).length > 0) {
        setCollection(data.result)
      }
    }
  })

  const data = collection[0]?.data

  const stringOptions = useMemo(() => {
    return data ? extractStringOptions(data[0]?.fields) : []
  }, [data])

  const booleanOptions = useMemo(() => {
    return data ? extractBooleanOptions(data[0]?.fields) : []
  }, [data])

  const fields = useMemo(() => {
    return data ? extractNumericFields(data[0]?.fields) : []
  }, [data])
  
  const optionsArr = useMemo(() => {
    return data ? ['regions', ...stringOptions, ...booleanOptions] : []
  }, [data, stringOptions, booleanOptions])

  const [chartType, setChartType] = useState('')
  const [aggregation, setAggregation] = useState('sum')
  const [yAxis, setYAxis] = useState(fields.length > 0 ? fields[0].fieldName : '')
  const [xAxis, setXAxis] = useState(optionsArr.length > 0 ? optionsArr[0] : '')

  const aggOptions = ['sum', 'avg', 'count', 'min', 'max']

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
    width: 900,
    height: 500,
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

  return (
    <div className="h-[calc(100vh-5.1rem)] w-screen px-8 py-16 flex flex-row">
      {
        collection.length === 0 ?
          <LoadingSpinner /> :
          <div className="flex w-full">
            <div className="flex-grow flex flex-wrap bg-blue-100 justify-center items-center">
              <ChartsContainer 
                chartType={chartType}
                commonProps={commonProps}
                fields={fields}
              />
            </div>
            <aside className="w-1/4 bg-red-200 h-full">
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
            </aside>
          </div>
      }
    </div>
  )
}

export default Statistics