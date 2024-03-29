import PropTypes from 'prop-types'

function LayerItem ({ layer }) {
  return (
    <div className="flex gap-2 mb-2">
      <label
        htmlFor={layer.id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        <div className="text-lg font-bold mb-2">{layer.name}</div>
      </label>
    </div>
  )
}

LayerItem.propTypes = {
  layer: PropTypes.object
}

export default LayerItem
