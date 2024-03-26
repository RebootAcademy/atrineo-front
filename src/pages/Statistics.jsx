import { useContext, useEffect, useState, useMemo, useRef } from "react"

import OptionsMenu from "../components/Graphs/OptionsMenu/OptionsMenu"
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner"
import ChartsContainer from "@/components/Graphs/ChartsContainer/ChartsContainer"
import CustomButton from "@/components/CustomButton/CustomButton"

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
  const [zAxis, setZAxis] = useState('')
  const [ showOptions, setShowOptions ] = useState(true)

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

  const changeZAxis = (name) => {
    setZAxis(name)
  }

  const containerRef = useRef(null)
  const { width: containerWidth } = useDimensions(containerRef)

  const localInfo = localStorage.graphs
  let localArr = []

  if (localInfo) localArr = JSON.parse(localInfo)
  
  const countGraphs = () => {
    return localArr?.length > 1
  }

  const checkWidth = () => {
    return containerWidth > 500
  }

  //For devices less than 500px wide, show one chart per row.
  // For bigger devices, check how many charts have to be displayed
  // If there is only one chart, take the whole screen
  const numGraphsPerRow = checkWidth() ?
    countGraphs() ? 2 : 
      1 : 1
  const graphMargin = 10
  const aspectRatio = 16 / 9


  const calculatedGraphWidth = ((checkWidth() ? containerWidth - 200 : containerWidth) - (graphMargin * (numGraphsPerRow))) / numGraphsPerRow
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
    zAxis: zAxis,
    changeXAxis: changeXAxis,
    changeYAxis: changeYAxis,
    changeZAxis: changeZAxis
  }

  const displayOptions = () => {
    setShowOptions(true)
  }

  return (
    <div className="h-[calc(100vh-5.1rem)] w-screen p-8 flex flex-col">
      {
        Object.keys(collection).length === 0 ?
          <LoadingSpinner width="100" height="100" /> :
          <>
            <div className="mb-4">
              {
                !showOptions &&
                <CustomButton 
                  text="NEW CHART +"
                  fn={displayOptions}
                />
              }
            </div>
            <div className="flex w-full h-full">
              <div className="flex-grow flex flex-wrap justify-center items-center gap-12" ref={containerRef}>
                <ChartsContainer
                  chartType={chartType}
                  fields={fields}
                  commonProps={commonProps}
                />
              </div>
              {
                showOptions &&
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
                    changeAggregation={changeAggregation}
                    changeXAxis={changeXAxis}
                    changeYAxis={changeYAxis}
                    changeZAxis={changeZAxis}
                    toggleDisplay={setShowOptions}
                  />
                </aside>
              }
            </div>
          </>
      }
    </div>
  )
}

export default Statistics