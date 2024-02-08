import { Circle } from "react-leaflet"
import { useDistrictsCoords } from "../../../hooks/useDistrictCoords"

function PopulationLayer({ filterValue }) {
  console.log(filterValue)
  const data = useDistrictsCoords({})
  console.log(data)
  const filteredData = data && data.filter(item => filterValue);
  console.log(filteredData)


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

export default PopulationLayer;