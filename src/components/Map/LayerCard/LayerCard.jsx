import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/Card/Card"

import FilterGroup from "../FilterGroup/Filtergroup"
import RegionFilter from "../FilterGroup/RegionFilter"
import PropTypes from 'prop-types'


function LayerCard({ layerId = 1, mapDivision }) {
  return (
    <Card className='w-full flex flex-col items-center'>
      <CardHeader>
        <CardTitle>Layer {layerId}</CardTitle>
      </CardHeader>
      <CardContent>
        <FilterGroup
        mapDivision={mapDivision}
          layers={[
            { id: 'startups', name: 'Startups' },
            // { id: 'population', name: 'Region' }
          ]}
        />
        {/* <RegionFilter
          layers={[
            { id: 'region', name: 'Region' }
          ]}
          onPopulationClicked={onPopulationClicked}
        /> */}
      </CardContent>

      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>

  )
}

LayerCard.propTypes = {
  layerId: PropTypes.number
}

export default LayerCard