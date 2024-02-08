import { Circle } from "react-leaflet"
import { useDistrictsCoords } from "../../../hooks/useDistrictCoords"
import { useContext } from "react"
import { LayerContext } from "../../../context/layerContext"

const PopulationLayer = ({showPopulation}) => {
//   const { showPopulation } = useContext(LayerContext);
  const data = useDistrictsCoords({});

  return (
    <section>
      {showPopulation && data && data.map((item, index) => (
        <Circle
          key={index}
          center={[item.latitude, item.longitude]}
          pathOptions={{ fillColor: 'orange', stroke: false, fillOpacity: 0.6 }}
          radius={item.districtPopulation / 500}
        />
      ))}
    </section>
  );
};

export default PopulationLayer;
