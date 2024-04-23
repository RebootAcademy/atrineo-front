import { useEffect, useContext, useMemo } from 'react'
import { LayerContext } from '@/context/layerContext'
import { CollectionContext } from '@/context/collectionContext'
import { LocationContext } from '@/context/locationContext'

import { v4 } from 'uuid'

import NumericLayer from '../NumericLayer/NumericLayer'
import RegionsComponent from '../RegionsComponent/RegionsComponent'
import StartupsComponent from '../StartupsComponent/StartupsComponent'

import { isWithinPolygon, checkValue } from '@/helpers'

function LayersManager() {
  const { collection } = useContext(CollectionContext)
  const { locations } = useContext(LocationContext)
  const { searchPolygon, layers, setLayers } = useContext(LayerContext)

  useEffect(() => {
    const storedLayers = JSON.parse(window.localStorage.getItem('layers')) || []
    setLayers(storedLayers)
  }, [setLayers])

  console.log(layers)

  const filteredLayers = useMemo(() => layers.filter(layer => layer.isVisible).map(layer => {
    const fields = Object.keys(layer.data).filter(key => key !== 'type')
    const filteredData = collection?.data
      .filter(dataItem => isWithinPolygon(dataItem, searchPolygon))
      .filter(row => {
        let valid = row.fields.every(item => 
          layer.data[item.fieldName] === undefined || checkValue(item.fieldValue, item.fieldName, layer)
        )
        if (layer.data.regions?.names) {
          const name = locations[layer.data.regions.division].find(l => l._id === row.locationId[layer.data.regions.division])?.name
          valid = valid && layer.data.regions.names.includes(name)
        }
        return valid
      })

    return { layer, filteredData, fields }
  }), [collection, layers, searchPolygon, locations])

  const displayLayers = (filters, array, searchPolygon) => {
    if (!filters) {
      return null
    }
    return Object.entries(filters)
      .filter(([ , value]) => typeof value.value === 'object')
      .map(([key, value]) => {
        return (
          <NumericLayer
            key={key}
            filters={filters}
            field={key}
            data={array}
            searchPolygon={searchPolygon}
            color={value.color}
          />
        )
      })
  }

  return (
    <div>
      {filteredLayers.map(({ layer, filteredData, fields }) => {
        return fields.map(field => {
          return (
            <div key={v4()}>
              {layer.data.type === 'startups' && (
                <StartupsComponent 
                  data={filteredData} 
                  color={layer.data.color}
                />
              )}
              {layer.data.type === 'regions' && (
                <RegionsComponent 
                  data={filteredData} 
                  fieldName={field} 
                  color={layer.data.color}
                /> 
              )}
              {displayLayers(layer.data, filteredData, searchPolygon)}
            </div>
          )
        })
      })
      }
    </div>
  )
}

export default LayersManager