/* eslint-disable no-unused-vars */
import { EditControl } from 'react-leaflet-draw'
import { useContext, useRef } from 'react'
import { LayerContext } from '../../../context/layerContext'
import { FeatureGroup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'

function DrawComponent() {
  const { searchPolygon, setSearchPolygon } = useContext(LayerContext)

  const onDrawCreate = (e) => {
    const { layer } = e
    const latlngs = layer.getLatLngs()
    setSearchPolygon(latlngs)
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
  
  return (
    <FeatureGroup>
      <EditControl
        position="bottomright"
        onCreated={onDrawCreate}
        onDeleted={() => {
          setSearchPolygon(null)
        }}
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
