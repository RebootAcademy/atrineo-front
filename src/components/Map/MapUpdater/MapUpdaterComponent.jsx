import PropTypes from "prop-types"
import { useEffect } from "react"
import { useMap, useMapEvent } from "react-leaflet"

export function MapUpdater({ center }) {
  const map = useMap()

  useEffect(() => {
    map.setView(center)
  }, [center, map])

  return null
}

export function FlyToMarker({ center }) {
  const map = useMapEvent({
    click() {
      map.flyTo(center, map.getZoom(), {
        animate: true,
        duration: 1.5,
      })
    }
  })
  return null
}

MapUpdater.propTypes = {
  center: PropTypes.array,
  position: PropTypes.array
}
