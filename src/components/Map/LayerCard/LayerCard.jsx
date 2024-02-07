import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/Card/Card"

import FilterGroup from "../FilterGroup/Filtergroup"

function LayerCard({ layerId=1 }) {
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
      </CardContent>

      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>

  )
}

export default LayerCard