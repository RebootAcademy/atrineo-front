import LayerItem from "./LayerItem"
import FilterOptions from "./FilterOptions"
import { Card, CardHeader, CardTitle } from "../../ui/Card/Card"

import PropTypes from 'prop-types'

function FilterGroup({ title, layers }) {
  return (
    <Card className='bg-orange-400 mb-2 w-[300px] pt-0 p-2'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      {layers && layers.map((layer, id) => (
        <div key={id}>
          <LayerItem layer={layer} />
          <FilterOptions />
        </div>
      ))}
    </Card>
  )
}

FilterGroup.propTypes = {
  title: PropTypes.string,
  layers: PropTypes.array
}

export default FilterGroup