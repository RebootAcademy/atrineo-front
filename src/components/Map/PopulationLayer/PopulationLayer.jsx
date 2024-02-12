import { Circle } from "react-leaflet";
import { useDistrictsCoords } from "../../../hooks/useDistrictCoords";
import { useContext } from "react";
import { LayerContext } from "../../../context/layerContext"
import { isWithinPolygon } from "../../../helpers";

function PopulationLayer() {
  const data = useDistrictsCoords({}) || [];
  const { populationFilter, searchPolygon } = useContext(LayerContext);

  // Filtra solo si populationFilter está definido y no es NaN
  const filteredItems = data
    .filter((dataItem) => {
      if (!populationFilter || isNaN(populationFilter)) {
        // Si no hay filtro, todos los elementos cumplen el criterio
        return true;
      }
      // Aplica el filtro solo si populationFilter está definido
      return !isNaN(dataItem.districtPopulation) && dataItem.districtPopulation >= populationFilter;
    })
    .filter((dataItem) => isWithinPolygon(dataItem, searchPolygon))

  const circles = filteredItems.map((filteredItem, index) => (
    <Circle
      key={index}
      center={[filteredItem.latitude, filteredItem.longitude]}
      pathOptions={{ fillColor: 'red', stroke: false, fillOpacity: 0.2 }}
      radius={Math.log(filteredItem.districtPopulation) * 500}
    />
  ));

  return <>{circles}</>;
}

export default PopulationLayer;
