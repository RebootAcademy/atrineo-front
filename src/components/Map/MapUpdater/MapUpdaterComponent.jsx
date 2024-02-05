import PropTypes from "prop-types"
import { useEffect } from "react"
import { useMap } from "react-leaflet"

function MapUpdater({ center }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center)
  }, [center, map])

  return null
}

MapUpdater.propTypes = {
  center: PropTypes.array
}

export default MapUpdater