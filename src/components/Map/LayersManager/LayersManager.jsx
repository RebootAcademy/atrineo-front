import { useEffect, useContext, useMemo } from 'react'
import { LayerContext } from '@/context/layerContext'
import { CollectionContext } from '@/context/collectionContext'

import NumericLayer from '../NumericLayer/NumericLayer'
import RegionsComponent from '../RegionsComponent/RegionsComponent'
import StartupsComponent from '../StartupsComponent/StartupsComponent'
/* import SelectedRegionComponent from '../SelectedRegionComponent/SelectedRegionComponent' */

import { isWithinPolygon, checkValue } from '@/helpers'
import { getNextColor } from '@/helpers/colors'

const displayLayers = (filters, array, searchPolygon) => {
  return Object.keys(filters)
    .filter(key => typeof filters[key] === 'number')
    .map(key => {
      const layerColor = getNextColor()
      return (
      <NumericLayer
        key={key}
        filters={filters}
        field={key}
        data={array}
        searchPolygon={searchPolygon}
        color={layerColor}
      />
      )
    })
}

function LayersManager() {
  const { collection } = useContext(CollectionContext)
  const { searchPolygon, layers, setLayers, mapDivision } = useContext(LayerContext)

  useEffect(() => {
    const storedLayers = JSON.parse(window.localStorage.getItem('layers')) || []
    setLayers(storedLayers)
  }, [setLayers])

  const filteredLayers = useMemo(() => layers.filter(layer => layer.isVisible).map(layer => {
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
    return { layer, filteredData, field }
  }), [collection, layers, searchPolygon, mapDivision])

  return (
    <div>
      {filteredLayers.map(({ layer, filteredData, field }) => (
        <div key={layer.id}>
          {layer.data.type === 'startups' && <StartupsComponent data={filteredData} color={layer.color} />}
          {layer.data.type === 'regions' && <RegionsComponent data={filteredData} fieldName={field} color={layer.color} /> }
          {displayLayers(layer.data, filteredData, searchPolygon)}
        </div>
      ))}
    </div>
  )
}

export default LayersManager