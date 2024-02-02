import { Circle } from "react-leaflet"
import { useDistrictsCoords } from "../../hooks/useDistrictCoords"

const PopulationLayer = ({ filterValue }) => {
  const data = useDistrictsCoords({})

  const filteredData = data && data.filter(item => item.districtPopulation <= filterValue)

  return (
    <section>
      {filteredData && filteredData.map((item, index) => (
        <Circle
          key={index}
          center={[item.latitude, item.longitude]}
          pathOptions={{ fillColor: 'orange', stroke: false, fillOpacity: 0.6 }}
          radius={item.districtPopulation / 500}
        />
      ))}
    </section>
  )
}

export default PopulationLayer
