import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/Card/Card"

import FilterGroup from "../FilterGroup/Filtergroup"
import RegionFilter from "../FilterGroup/RegionFilter"

function LayerCard({ layerId = 1, onPopulationClicked }) {
  return (
    <Card className='w-[250px] '>
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

export default LayerCard