/* eslint-disable no-unused-vars */
import { useState } from 'react'
import LayerItem from './LayerItem'
import FilterOptions from './FilterOptions'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card/Card'

import DisplayFilters from "../../JuananComponents/DisplayFilters/DisplayFilters"

import PropTypes from 'prop-types'

function FilterGroup({ type, layers, layerObj }) {
  const [collectionType, setCollectionType] = useState(type)

  const selectType = (value) => {
    setCollectionType(value)
  }

  return (
    <Card className='mb-2 w-[300px] pt-0 p-2'>
      <CardContent>
        {layers && layers.map((layer, id) => (
          <div key={id}>
            <div className="flex">
              <input
                type="checkbox"
                checked={collectionType === layer.name}
                className="mr-2"
                onChange={() => selectType(layer.name)}
              />
              <LayerItem layer={layer} />
            </div>
            {/* <FilterOptions /> */}
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
