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

function LayerCard({ onCloseMenu }) {
  const { saveCurrentLayer, nextLayerId } = useContext(LayerContext)

  const layerRef = useRef({})

  const handleSave = () =>{
    saveCurrentLayer(layerRef.current)
    onCloseMenu()
  }

  return (
    <Card className='w-full flex flex-col items-center'>

      <CardHeader>
        <CardTitle>Layer {nextLayerId}</CardTitle>
      </CardHeader>

      <CardContent>
        <FilterGroup
          layers={[
            { id: 'startups', name: 'Startups' }
            // { id: 'population', name: 'Region' }
          ]}
          layerObj={layerRef}
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
