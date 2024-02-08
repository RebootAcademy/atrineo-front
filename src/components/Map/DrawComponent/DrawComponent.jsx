import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

import PropTypes from 'prop-types'

function DrawComponent({ searchPolygon, setSearchPolygon }) {
  const onDrawCreate = (e) => {
    // Obtén la capa del evento
    const layer = e.layer;

    // Aquí puedes manejar la lógica adicional si es necesario
    const latlngs = layer.getLatLngs();
    setSearchPolygon(latlngs)
  }

  return (
    <EditControl 
      position="bottomright"
      onCreated={onDrawCreate}
      onDeleted={() => {
        setSearchPolygon(null);
      }}
      draw={{
        rectangle: false,
        polyline: false,
        circle: false,
        marker: false,
        circlemarker: false,
        polygon: !searchPolygon ? {
          shapeOptions: {
            color: 'var(--primary)',
            weight: 1
          },
        } : false,
      }}
    />
  )
}

DrawComponent.propTypes = {
  searchPolygon: PropTypes.array,
  setSearchPolygon: PropTypes.func
}

export default DrawComponent