import { useContext } from "react"

import BarPlot from '../components/Graphs/BarPlot/BarPlot'

import { CollectionContext } from "../context/collectionContext"
import { LayerContext } from "../context/layerContext"

import { extractRegionNames } from "../helpers"


function Statistics () {
  const { collection } = useContext(CollectionContext)
  const { mapDivision } = useContext(LayerContext)

  const regionNames = extractRegionNames(collection, mapDivision)
  const data = collection[0]?.data

  return (
    <div>
      <BarPlot width={700} height={400} data={data} regions={regionNames}  />
    </div>
  )
}

export default Statistics