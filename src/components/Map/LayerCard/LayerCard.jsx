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
        <CardTitle>Filter Layer {layerId}</CardTitle>
      </CardHeader>

      <CardContent>
        
        <FilterGroup 
          title="Layers"
          layers={[
            { id: 'startups', name: 'Startups' },
            { id: 'patents', name: 'Patents' },
            { id: 'population', name: 'Population' }
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