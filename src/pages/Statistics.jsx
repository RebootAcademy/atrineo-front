import { useContext } from "react"

import BarPlot from '../components/Graphs/BarPlot/BarPlot'

import { CollectionContext } from "../context/collectionContext"
import { LayerContext } from "../context/layerContext"

import { extractRegionNames, extractNumericFields } from "../helpers"

function Statistics () {
  const { collection } = useContext(CollectionContext)
  const { mapDivision } = useContext(LayerContext)

  const regionNames = extractRegionNames(collection, mapDivision)
  const data = collection[0]?.data
  let fields
  if (data) {
    fields = extractNumericFields(data[0].fields)
  }

  return (
    <>
      <BarPlot width={700} height={400} data={data} regions={regionNames} fields={fields} />
    </>
  )
}

export default Statistics