import { useEffect, useContext } from 'react'
import { LayerContext } from '@/context/layerContext'
import { CollectionContext } from '@/context/collectionContext'

import NumericLayer from '../NumericLayer/NumericLayer'
import RegionsComponent from '../RegionsComponent/RegionsComponent'
import StartupsComponent from '../StartupsComponent/StartupsComponent'
import SelectedRegionComponent from '../SelectedRegionComponent/SelectedRegionComponent'

import { isWithinPolygon } from '@/helpers'
import { colorPalette } from '@/helpers/colors'

const checkValue = (itemValue, layerKey, layerObj) => {
  if (layerObj.data.type !== 'startups') return true
  if (typeof layerObj.data[layerKey] === 'number') {
    return itemValue >= layerObj.data[layerKey]
  } else {
    return itemValue === layerObj.data[layerKey]
  }
}

const displayLayers = (filters, array, searchPolygon, colorIndex) => {
  return Object.keys(filters).reduce((elements, key) => {
    if (typeof filters[key] === 'number') {
      elements.push(
        <NumericLayer
          key={key}
          filters={filters}
          field={key}
          data={array}
          searchPolygon={searchPolygon}
          color={colorPalette[colorIndex % colorPalette.length]}
        />
      )
    }
    return elements
  }, [])
}

function LayersManager() {
  const { collection } = useContext(CollectionContext)
  const { searchPolygon, layers, setLayers, mapDivision } = useContext(LayerContext)

  useEffect(() => {
    const storedLayers = JSON.parse(window.localStorage.getItem('layers')) || []
    setLayers(storedLayers)
  }, [setLayers])

  let colorIndex = 0

  return (
    <div>
      {Object.keys(collection).length !== 0 && layers.filter(layer => layer.isVisible).map((layer) => {
        const field = Object.keys(layer.data).find(key => key !== 'type' && key !== 'fieldName')
        const filteredData = collection?.data
          .filter(dataItem => isWithinPolygon(dataItem, searchPolygon))
          .filter(row => {
            let valid = row.fields.every(item =>
              layer.data[item.fieldName] === undefined || checkValue(item.fieldValue, item.fieldName, layer)
            )

            if (layer.data.regions) {
              valid = valid && layer.data.regions.includes(row.locationId[mapDivision]?.name)
            }
            return valid
          })

        colorIndex++

        return (
          <div key={layer.id}>
            {layer.data.type === 'startups' && (
              <>
                <StartupsComponent data={filteredData} />
                <SelectedRegionComponent data={filteredData} />
              </>
            )}
            {layer.data.type === 'regions' && <RegionsComponent data={filteredData} fieldName={field} />}
            {displayLayers(layer.data, filteredData, searchPolygon, colorIndex)}
          </div>
        )
      })
      }

    </div>
  )
}

export default LayersManager
