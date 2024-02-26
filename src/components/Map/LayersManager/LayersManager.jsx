import { useEffect, useContext } from 'react'
import { CollectionContext } from '../../../context/collectionContext'
import { LayerContext } from '../../../context/layerContext'

import StartupsComponent from '../StartupsComponent/StartupsComponent'
import NumericLayer from '../../JuananComponents/NumericLayer/NumericLayer'
import RegionsComponent from '../RegionsComponent/RegionsComponent'

import { isWithinPolygon } from '../../../helpers'

function LayersManager () {
  const { collection } = useContext(CollectionContext)
  const { searchPolygon, layers, setLayers } = useContext(LayerContext)

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
    // console.log(itemValue, layerKey, layerObj, layerObj[layerKey])
    if (typeof layerObj[layerKey] === 'number') {
      return itemValue >= layerObj[layerKey]
    } else {
      return itemValue === layerObj[layerKey]
    }
  }

  return (
    <div>
      {layers
        .filter(layer => layer.isVisible)
        .map((layer) => {
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
            return valid
          })
        })

        return (
          <div>
            <StartupsComponent data={filteredData} />
            <RegionsComponent data={filteredData} />
            {displayLayers(layer.data, filteredData)}
          </div>
        )
      })}
    </div>
  )
}

export default LayersManager
