/* eslint-disable no-unused-vars */
import { useContext, useRef } from 'react'
import CustomButton from '../../CustomButton/CustomButton'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '../../ui/Card/Card'

import FilterGroup from '../FilterGroup/Filtergroup'
import PropTypes from 'prop-types'
import { LayerContext } from '../../../context/layerContext'
import { CollectionContext } from "../../../context/collectionContext"


function LayerCard({ onCloseMenu }) {
  const { collection } = useContext(CollectionContext)
  let collectionType
  if (collection.length !== 0) {
    collectionType = collection[0].collectionType
  }

  const { saveCurrentLayer, nextLayerId } = useContext(LayerContext)

  const layerRef = useRef({})

  const handleSave = () => {
    saveCurrentLayer(layerRef.current)
    onCloseMenu()
  }

  const displayTypes = () => {
    return collectionType === 'startups' ?
      [
        { id: 'startups', name: 'Startups' },
        { id: 'regions', name: 'Regions' }
      ] :
      [
        { id: 'regions', name: 'Regions' }
      ]
  }

  return (
    <Card className='w-full flex flex-col border-0'>

      <CardHeader>
        <CardTitle>Layer {nextLayerId}</CardTitle>
      </CardHeader>

      <CardContent>
        <FilterGroup
          layers={displayTypes()}
          layerObj={layerRef}
          type={collectionType}
        />
      </CardContent>

      <CardFooter>
        <CustomButton
          text="Save"
          fn={handleSave}
        />
      </CardFooter>

    </Card>
  )
}

LayerCard.propTypes = {
  layerId: PropTypes.number,
  onCloseMenu: PropTypes.func
}

export default LayerCard
