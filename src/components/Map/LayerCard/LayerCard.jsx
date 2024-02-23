import { useContext } from "react"
import CustomButton from "../../CustomButton/CustomButton"
import { Card, CardFooter, CardHeader, CardTitle } from "../../ui/Card/Card"

import FilterGroup from "../FilterGroup/Filtergroup"
import PropTypes from 'prop-types'
import { LayerContext } from "../../../context/layerContext"

function LayerCard({ layerId = 1 }) {
  const { saveCurrentState } = useContext(LayerContext)

  return (
    <Card className='bg-blue-400 w-full flex flex-col items-center'>

      <CardHeader>
        <CardTitle>Layer {layerId}</CardTitle>
      </CardHeader>

      <FilterGroup
        layers={[
          { id: 'startups', name: 'Startups' },
          // { id: 'population', name: 'Region' }
        ]}
      />

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