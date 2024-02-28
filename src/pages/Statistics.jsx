import { useContext } from "react"

import BarPlot from '../components/Graphs/BarPlot/BarPlot'
import PieChart from "../components/Graphs/PieChart/PieChart"

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
  console.log(data)

  const regionNames = extractRegionNames(collection, mapDivision)
  const stringOptions = extractStringOptions(data[0].fields)
  const booleanOptions = extractBooleanOptions(data[0].fields)

  const optionsArr = ['regions', ...stringOptions, ...booleanOptions]

  return (
    <>
      {
        collection.length === 0 ?
          'Loading...' :
          <BarPlot
            width={700}
            height={400}
            data={data}
            regions={regionNames}
            fields={fields}
            options={optionsArr}
            division={mapDivision}
          />
      }
      {
        collection.length === 0 ?
          'Loading...' :
          <PieChart
            width={700}
            height={400}
            data={data}
            fields={fields} />
      }

    </>
  )
}

export default Statistics