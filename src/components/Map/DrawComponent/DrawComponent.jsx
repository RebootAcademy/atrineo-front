/* eslint-disable no-unused-vars */
import { EditControl } from 'react-leaflet-draw'
import { useContext, useEffect, useState } from 'react'
import { LayerContext } from '../../../context/layerContext'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'

function DrawComponent() {
  const { searchPolygon, setSearchPolygon } = useContext(LayerContext)

  const onDrawCreate = (e) => {
    const layer = e.layer
    const latlngs = layer.getLatLngs()
    setSearchPolygon(latlngs)
  }

  const onDrawEdit = (e) => {
    const layer = e.layer
    const editedPolygon = layer.getLayers()[0]
    const latlngs = editedPolygon.getLatLngs()
    setSearchPolygon(latlngs)
  }

  return (
    <EditControl
      position='bottomright'
      onCreated={onDrawCreate}
      onEdited={onDrawEdit}
      onDeleted={() => {
        setSearchPolygon(null)
      }}
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
  )
}

export default DrawComponent
