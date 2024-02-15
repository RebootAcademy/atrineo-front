import LayerItem from "./LayerItem"
import FilterOptions from "./FilterOptions"
<<<<<<< HEAD
=======
import { CollapsibleContent, Collapsible } from "../../ui/Collapsible/Collapsible"
>>>>>>> 93a6e4aef7d4e25010b0c396165b963e46c30369
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/Card/Card"

import PropTypes from 'prop-types'

function FilterGroup({ title, layers }) {
  return (
    <Card className='mb-2 w-[300px] pt-0 p-2'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
          {layers && layers.map((layer, id) => (
            <div key={id}>
              <LayerItem layer={layer} />
<<<<<<< HEAD
                <FilterOptions />
=======
              <Collapsible>
              <CollapsibleContent>
                <FilterOptions mapDivision={mapDivision} />
              </CollapsibleContent>
              </Collapsible>
>>>>>>> 93a6e4aef7d4e25010b0c396165b963e46c30369
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