import { useMap } from "react-leaflet"
import { useEffect, useState } from "react"

const CoordsDisplay = () => {
  const [coordinates, setCoordinates] = useState({lat: 0, lng: 0})

  const map = useMap()

  useEffect (() => {
    const showCoordinates = (e) => {
      const { lat, lng } = e.latlng
      setCoordinates({ lat, lng })
    }
    map.on('mousemove', showCoordinates)
    return () => {
      map.off('mousemove', showCoordinates)
    }
  }, [map])

  return  (
    <section>
      <div className= 'w-fixed z-[9999] absolute bottom-0 left-0 text-base font-bold px-2 bg-blue-300 opacity-80'>
        Coordinates: {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
      </div>
    </section>
  )
}

export default CoordsDisplay