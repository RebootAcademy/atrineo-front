/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from 'react'
import { CollectionContext } from '../../../context/collectionContext'
import { LayerContext } from '../../../context/layerContext'

import StartupsComponent from '../StartupsComponent/StartupsComponent'
import NumericLayer from '../NumericLayer/NumericLayer'
import RegionsComponent from '../RegionsComponent/RegionsComponent'

import { isWithinPolygon } from '../../../helpers'
import SelectedRegionComponent from '../SelectedRegionComponent/SelectedRegionComponent'

function LayersManager() {
  const { collection } = useContext(CollectionContext)
  const { searchPolygon, layers, setLayers, mapDivision } = useContext(LayerContext)

  let colorIndex = 0

  useEffect(() => {
    const storedLayers = JSON.parse(window.localStorage.getItem('layers')) || []
    setLayers(storedLayers)
  }, [])

  const colors = ['#4B7CCC', '#77F2FF', '#858D99', '#FF8658', '#CC5948', '#98FB98']

  const displayLayers = (filters, array) => {
    const elements = []
    for (const key in filters) {
      switch (typeof filters[key]) {
      case 'number':
        elements.push(
          <NumericLayer
            filters={filters}
            field={key}
            data={array}
            searchPolygon={searchPolygon}
            color={colors[colorIndex % colors.length]}
          />
        )
        colorIndex++
        break
      default:
        break
      }
    }
    return elements
  }

  const checkValue = (itemValue, layerKey, layerObj) => {
    if (layerObj.data.type !== 'startups') {
      return true
    }
    if (typeof layerObj.data[layerKey] === 'number') {
      return itemValue >= layerObj.data[layerKey]
    } else {
      return itemValue === layerObj.data[layerKey]
    }
  }

  return (
    <div>
      {layers
        .filter(layer => layer.isVisible)
        .map((layer, index) => {
          let field
          for (const key in layer.data) {
            if (key !== 'type' && key !== 'fieldName') {
              field = key
            }
          }
          let filteredData = collection.flatMap((item) => {
            return item.data
              .filter((filteredData) => isWithinPolygon(filteredData, searchPolygon))
              .filter(row => {
                let valid = true
                row.fields.flatMap(item => {
                  for (const key in layer.data) {
                    if (key !== 'type' && key !== 'fieldName' && key === item.fieldName && !checkValue(item.fieldValue, key, layer)) {
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
          colorIndex++

          return (
            <div key={index}>
              {
                layer.data.type === 'startups' && (
                  <>
                    <StartupsComponent data={filteredData} />
                    <SelectedRegionComponent data={filteredData}/>
                  </>
                )
              }
              {
                layer.data.type === 'regions' && (
                  <>
                    <RegionsComponent data={filteredData} fieldName={field} />
                  </>
                )
              }
              {displayLayers(layer.data, filteredData)}
            </div>
          )
        })
      }

    </div>
  )
}

export default LayersManager
