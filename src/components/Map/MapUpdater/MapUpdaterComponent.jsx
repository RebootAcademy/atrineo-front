import PropTypes from "prop-types"
import { useEffect } from "react"
import { useMap, useMapEvents } from "react-leaflet"

export function MapUpdater({ center }) {
  const map = useMap()

  useEffect(() => {
    map.setView(center)
  }, [center, map])

  return null
}

export function FlyToMarker({ position }) {
  const map = useMapEvents({
    click() {
      map.flyTo(position, map.getZoom())
    }
  })
  return null
}

MapUpdater.propTypes = {
  center: PropTypes.array,
  position: PropTypes.array
}
