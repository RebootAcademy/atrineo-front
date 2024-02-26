/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useContext } from 'react'
import { CollectionContext } from '../../../context/collectionContext'
import { LayerContext } from '../../../context/layerContext'

import StartupsComponent from '../StartupsComponent/StartupsComponent'
import NumericLayer from '../../JuananComponents/NumericLayer/NumericLayer'
import { isWithinPolygon } from '../../../helpers'

function LayersManager() {
  const { collection } = useContext(CollectionContext)

  const { searchPolygon, layers, setLayers, mapDivision } = useContext(LayerContext)

  useEffect(() => {
    const storedLayers = JSON.parse(window.localStorage.getItem('layers')) || []
    setLayers(storedLayers)
  }, [])

  const colors = ['dodgerBlue', 'red', 'green']

  const displayLayers = (filters, array) => {
    const elements = []
    let index = 0
    for (const key in filters) {
      switch (typeof filters[key]) {
      case 'number':
        elements.push(
          <NumericLayer
            filters={filters}
            field={key}
            data={array}
            searchPolygon={searchPolygon}
            color={colors[index]}
          />
        )
        index++
        break
      default:
        break
      }
    }
    return elements
  }

  const checkValue = (itemValue, layerKey, layerObj) => {
    if (typeof layerObj[layerKey] === 'number') {
      return itemValue >= layerObj[layerKey]
    } else {
      return itemValue === layerObj[layerKey]
    }
  }

  return (
    <>
      {layers
        .filter(layer => layer.isVisible)
        .map((layer, index) => {
          const filteredData = collection.flatMap((item) => {
            return item.data
              .filter((filteredData) => isWithinPolygon(filteredData, searchPolygon))
              .filter(row => {
                let valid = true
                row.fields.flatMap(item => {
                  for (const key in layer.data) {
                    if (key === item.fieldName && !checkValue(item.fieldValue, key, layer.data)) {
                      valid = false
                    }
                  }
                })
                if (layer.data.regions && !layer.data.regions.includes(row.locationId[mapDivision]?.name)) {
                  valid = false
                }
                return valid
              })
          })
          console.log(filteredData)
          return (
            <div key={index}>
              <StartupsComponent data={filteredData} />
              {displayLayers(layer.data, filteredData)}
            </div>
          )
        // return (
        //   // <div key={index}>
        //   //   <StartupsComponent filters={layer.data} searchPolygon={searchPolygon} />
        //   //   <PopulationLayer filters={layer.data} searchPolygon={searchPolygon} />
        //   //   {/* <PatentsLayer filters={layer.data} searchPolygon={searchPolygon} />
        //   //   <ResearchInvestmentLayer filters={layer.data} searchPolygon={searchPolygon} />
        //   //   <LifeQualityLayer filters={layer.data} searchPolygon={searchPolygon} />
        //   //   <GnpLayer filters={layer.data} searchPolygon={searchPolygon} /> */}
        //   // </div>
        // )
        })}
    </>
  )
}

export default LayersManager
