import { useState } from 'react'
import LayerItem from './LayerItem'
import { Card, CardContent } from '../../ui/Card/Card'

import DisplayFilters from "../DisplayFilters/DisplayFilters"

import PropTypes from 'prop-types'

function FilterGroup({ type, layers, layerObj }) {
  const [collectionType, setCollectionType] = useState(type)

  const selectType = (value) => {
    setCollectionType(value)
  }

  return (
    <Card className='mb-2 w-[300px] pt-0 p-2 overflow-y-auto max-h-[500px]'>
      <CardContent>
        {layers && layers.map((layer, id) => (
          <div key={id}>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={collectionType === layer.name}
                className="mr-2"
                onChange={() => selectType(layer.name)}
              />
              <div className='mt-3'>
                <LayerItem layer={layer} />
              </div>
            </div>
            {
              collectionType === layer.name &&
              <DisplayFilters layerObj={layerObj} type={layer.id} />
            }
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

FilterGroup.propTypes = {
  type: PropTypes.string,
  layers: PropTypes.array,
  layerObj: PropTypes.object
}

export default FilterGroup
