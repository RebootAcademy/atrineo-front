import PropTypes from 'prop-types'
import { Popup } from 'react-leaflet'
import { useContext } from 'react'
import { CollectionContext } from '../../../context/collection'

function PopupComponent ({ name }) {
  const { collection } = useContext(CollectionContext)

  // Primero miramos sin collection llega hasta data
  if (!collection || !collection[0] || !collection[0].data) {
    return null
  }

  // Map sobre la colección y genera un Popup para cada startup
  const startUpNames = []
  collection[0]?.data.map((startup) => (
    startUpNames.push(
      <Popup
        key={startup._id}>
        <div className="text-sm">{name}</div>
      </Popup>
    )))

  return <>{startUpNames}</>
}

PopupComponent.propTypes = {
  name: PropTypes.string
}

export default PopupComponent
