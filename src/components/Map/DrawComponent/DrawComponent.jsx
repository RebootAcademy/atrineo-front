import { EditControl } from 'react-leaflet-draw'
import { useContext, useEffect, useState } from 'react'
import { LayerContext } from '../../../context/layerContext'
import { FeatureGroup } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import './Style.css'

function DrawComponent() {
  const { searchPolygon, setSearchPolygon } = useContext(LayerContext)
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    const firstButton = document.querySelector('.leaflet-draw-toolbar a:nth-child(1)')
    const editButton = document.querySelector('.leaflet-draw-edit-edit')
    const removeButton = document.querySelector('.leaflet-draw-edit-remove')

    if (isDrawing) {
      editButton.classList.add('leaflet-draw-edit-show')
      removeButton.classList.add('leaflet-draw-edit-show')
      firstButton.style.setProperty('background-size', '300px', 'important')
      firstButton.style.setProperty('background-position', '-146px', 'important')

    } else {
      editButton.classList.remove('leaflet-draw-edit-show')
      removeButton.classList.remove('leaflet-draw-edit-show')
      firstButton.style.removeProperty('background-size')
      firstButton.style.removeProperty('background-position')
    }
  }, [isDrawing])

  const onDrawCreate = (e) => {
    const { layer } = e
    const latlngs = layer.getLatLngs()
    setSearchPolygon(latlngs)
    setIsDrawing(true)
  }

  const onDrawEdit = (e) => {
    const layers = e.layers
    layers.eachLayer((layer) => {
      const latlngs = layer.getLatLngs()[0]
      const polygonCoords = latlngs.map((latlng) => ({
        lat: latlng.lat,
        lng: latlng.lng
      }))
      setSearchPolygon(prevPolygon => {
        if (prevPolygon === null) {
          return [polygonCoords]
        }
        return [...prevPolygon, polygonCoords]
      })
    })
  }

  const onDrawDelete = () => {
    setSearchPolygon(null)
    setIsDrawing(false)
  }

  return (
    <FeatureGroup>
      <EditControl
        position="topleft"
        onCreated={onDrawCreate}
        onDeleted={onDrawDelete}
        onEdited={onDrawEdit}
        draw={{
          rectangle: false,
          polyline: false,
          circle: false,
          marker: false,
          circlemarker: false,
          polygon: !searchPolygon
            ? {
              shapeOptions: {
                color: 'var(--primary)',
                weight: 1
              }
            }
            : false
        }}
      />
    </FeatureGroup>
  )
}

export default DrawComponent
