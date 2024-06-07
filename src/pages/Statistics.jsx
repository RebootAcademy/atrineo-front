import { useContext, useEffect, useState, useMemo } from "react"

import OptionsMenu from "../components/Graphs/OptionsMenu/OptionsMenu"
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner"
import ChartsContainer from "@/components/Graphs/ChartsContainer/ChartsContainer"
import CustomButton from "@/components/CustomButton/CustomButton"

import { CollectionContext } from "../context/collectionContext"
import { UserContext } from "../context/userContext"

import { useUser } from "@/hooks/useUser"
import { useDivisions } from "@/hooks/useDivisions"
import { useCollectionFetch } from "@/hooks/useCollectionFetch"

import {
  extractNumericFields,
  extractStringOptions,
  extractBooleanOptions
} from "../helpers"

function Statistics() {
  const { collection, setCollection } = useContext(CollectionContext)
  const { user } = useContext(UserContext)

  useUser()
  useDivisions()
  useCollectionFetch(
    user,
    setCollection,
    collection
  )

  const data = collection?.data
  const aggOptions = ['sum', 'avg', 'count', 'min', 'max']

  const stringOptions = useMemo(() => {
    return data ? extractStringOptions(data[0]?.fields) : []
  }, [data])

  const booleanOptions = useMemo(() => {
    return data ? extractBooleanOptions(data[0]?.fields) : []
  }, [data])

  const fields = useMemo(() => {
    return data ? extractNumericFields(data[0]?.fields, collection?.columnTypes) : []
  }, [data, collection])

  const optionsArr = useMemo(() => {
    return data ? ['regions', ...stringOptions, ...booleanOptions] : []
  }, [data, stringOptions, booleanOptions])

  const [chartName, setChartName] = useState('')
  const [chartType, setChartType] = useState('')
  const [aggregation, setAggregation] = useState('sum')
  const [yAxis, setYAxis] = useState(fields.length > 0 ? fields[0].fieldName : '')
  const [xAxis, setXAxis] = useState(optionsArr.length > 0 ? optionsArr[0] : '')
  const [zAxis, setZAxis] = useState('')
  const [division, setDivision] = useState('division3')
  const [showOptions, setShowOptions] = useState(true)

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

  const changeDivision = (name) => {
    setDivision(name)
  }

  const aspectRatio = 16 / 9
  const fixedGraphWidth = 600
  const fiedgraphHeight = fixedGraphWidth / aspectRatio

  const commonProps = {
    width: fixedGraphWidth,
    height: fiedgraphHeight,
    data: data,
    options: [...optionsArr, ...fields.map(f => f.fieldName)]
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
                    text="NEW CHART"
                    fn={displayOptions}
                  />
              }
            </div>
            <div className="flex w-full h-full">
              <div className="flex-grow flex flex-wrap justify-center items-center gap-12" >
                <ChartsContainer
                  chartType={chartType}
                  fields={fields}
                  options={optionsArr}
                  commonProps={commonProps}
                  colTypes={collection?.columnTypes}
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
                    division={division}
                    changeDivision={changeDivision}
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