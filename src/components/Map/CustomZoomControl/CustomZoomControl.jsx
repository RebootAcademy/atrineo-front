/* eslint-disable no-undef */
import { useEffect } from 'react'
import { useMap } from 'react-leaflet'

function CustomZoomControl () {
  const map = useMap()

  useEffect(() => {
    if (!map) return
    // Asegúrate de que el control de zoom exista, si no, agrégalo.
    if (!map.zoomControl) {
      console.warn('Zoom control is undefined. Adding a new one.')
      L.control.zoom({ position: 'topright' }).addTo(map)
    } else {
      // Si el control de zoom existe, simplemente ajusta su posición.
      map.zoomControl.setPosition('topright')
    }
  }, [map])

  return null
}

export default CustomZoomControl
