import { useState, useEffect } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'

const CustomLayersControl = ({ baseLayers, overlays }) => {
  const map = useMap();
  const [control, setControl] = useState(null);

  useEffect(() => {
    if (!map || control) return;

    const layersControl = L.control.layers(baseLayers, overlays).addTo(map);
    setControl(layersControl);

    return () => {
      layersControl.remove();
    };
  }, [map, baseLayers, overlays, control]);

  // Aquí puedes añadir lógica adicional para manejar eventos o interacciones

  return null; // Este componente no necesita renderizar nada por sí mismo
}

export default CustomLayersControl