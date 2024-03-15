import { useContext, useEffect, useState, useMemo, useRef } from "react"

import OptionsMenu from "../components/Graphs/OptionsMenu/OptionsMenu"
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner"
import ChartsContainer from "@/components/Graphs/ChartsContainer/ChartsContainer"

import { CollectionContext } from "../context/collectionContext"
import { LayerContext } from "../context/layerContext"
import { UserContext } from "../context/userContext"

import { useUser } from "@/hooks/useUser"
import { useCollectionFetch } from "@/hooks/useCollectionFetch"

import {
  extractRegionNames,
  extractNumericFields,
  extractStringOptions,
  extractBooleanOptions
} from "../helpers"
import { useDimensions } from "@/hooks/useDimensions"

function Statistics() {
  const { collection, setCollection } = useContext(CollectionContext)
  const { mapDivision } = useContext(LayerContext)
  const { user } = useContext(UserContext)

  useUser()
  useCollectionFetch(
    user,
    setCollection,
    collection
  )

  const data = collection?.data
  const aggOptions = ['sum', 'avg', 'count', 'min', 'max']
  const regionNames = extractRegionNames(collection, mapDivision)

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

  const [chartName, setChartName] = useState('')
  const [chartType, setChartType] = useState('')
  const [aggregation, setAggregation] = useState('sum')
  const [yAxis, setYAxis] = useState(fields.length > 0 ? fields[0].fieldName : '')
  const [xAxis, setXAxis] = useState(optionsArr.length > 0 ? optionsArr[0] : '')


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


  const changeChartName = (name) => {
    setChartName(name)
  }

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

  const containerRef = useRef(null)
  const { width: containerWidth } = useDimensions(containerRef)
  const numGraphsPerRow = 2
  const graphMargin = 2
  const aspectRatio = 16 / 9

  const calculatedGraphWidth = (containerWidth - (graphMargin * (numGraphsPerRow - 1))) / numGraphsPerRow
  const calculatedGraphHeight = calculatedGraphWidth / aspectRatio

  const commonProps = {
    width: calculatedGraphWidth,
    height: calculatedGraphHeight,
    data: data,
    regions: regionNames,
    options: optionsArr,
    division: mapDivision,
  }

  const ownProps = {
    aggregation: aggregation,
    xAxis: xAxis,
    yAxis: yAxis,
    changeXAxis: changeXAxis,
    changeYAxis: changeYAxis
  }

  return (
    <div className="h-[calc(100vh-5.1rem)] w-screen px-8 py-16 flex flex-row">
      {
        Object.keys(collection).length === 0 ?
          <LoadingSpinner width="100" height="100" /> :
          <div className="flex w-full">
            <div className="flex-grow flex flex-wrap justify-center items-center gap-12" ref={containerRef}>
              <ChartsContainer
                chartType={chartType}
                fields={fields}
                commonProps={commonProps}
              />
            </div>
            <aside className="min-w-80 max-w-96 h-full">
              <OptionsMenu
                ownProps={ownProps}
                chartType={chartType}
                onChange={changeChartType}
                fields={fields}
                options={optionsArr}
                aggOptions={aggOptions}
                chartName={chartName}
                changeChartName={changeChartName}
                aggregation={aggregation}
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