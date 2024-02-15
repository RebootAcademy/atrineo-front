import { useContext } from "react"
import CustomButton from "../../CustomButton/CustomButton"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/Card/Card"

import FilterGroup from "../FilterGroup/Filtergroup"
import PropTypes from 'prop-types'
import { LayerContext } from "../../../context/layerContext"

function LayerCard({ layerId = 1 }) {
  const { saveCurrentState } = useContext(LayerContext)

  return (
    <Card className='w-full flex flex-col items-center'>

      <CardHeader>
        <CardTitle>Layer {layerId}</CardTitle>
      </CardHeader>

      <CardContent>
        <FilterGroup
          layers={[
            { id: 'startups', name: 'Startups' },
            // { id: 'population', name: 'Region' }
          ]}
        />
      </CardContent>

      <CardFooter>
        <CustomButton 
          text="Save"
          fn={saveCurrentState} 
        />
      </CardFooter>

    </Card>
  )
}

LayerCard.propTypes = {
  layerId: PropTypes.number
}

export default LayerCard