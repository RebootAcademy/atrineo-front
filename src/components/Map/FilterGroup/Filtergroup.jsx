import LayerItem from "./LayerItem"
import FilterOptions from "./FilterOptions"
import { CollapsibleContent, Collapsible } from "../../ui/Collapsible/Collapsible"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/Card/Card"

import PropTypes from 'prop-types'

function FilterGroup({ title, layers, mapDivision }) {
  return (
    <Card className='mb-2 w-[300px] pt-0 p-2'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
          {layers && layers.map((layer, id) => (
            <div key={id}>
              <LayerItem layer={layer} />
              <Collapsible>
              <CollapsibleContent>
                <FilterOptions mapDivision={mapDivision} />
              </CollapsibleContent>
              </Collapsible>
            </div>
          ))}
      </CardContent>
    </Card>
  )
}

FilterGroup.propTypes = {
  title: PropTypes.string,
  layers: PropTypes.array
}

export default FilterGroup