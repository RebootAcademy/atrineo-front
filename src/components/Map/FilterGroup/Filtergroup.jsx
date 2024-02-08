import LayerItem from "./LayerItem"
import FilterOptions from "./FilterOptions"
import { Collapsible, CollapsibleContent } from "../../ui/Collapsible/Collapsible"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../ui/Card/Card"

function FilterGroup({ title, layers }) {
  return (
    <Card className='mb-2'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Collapsible>
          {layers && layers.map((layer, id) => (
            <div key={id}>
              <LayerItem layer={layer} />
              <CollapsibleContent>
                <FilterOptions />
              </CollapsibleContent>
            </div>
          ))}
        </Collapsible>
      </CardContent>
    </Card>
  )
}

export default FilterGroup