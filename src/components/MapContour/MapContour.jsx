import { GeoJSON } from "react-leaflet"
import { useGeoJsonData } from "../../hooks/useGeoJsonData"

const style = {
  opacity: .8,
  fillOpacity: .1,
  color: 'dimGray',
  weight: 1.5
}

const ContourLayer = ({ mapDivision }) => {
  const data = useGeoJsonData(mapDivision)

  const filteredDivision = () => {
    return data?.features.filter((division) => division.properties.NAME_1 === 'Baden-Württemberg')
  }

  if (data) {
    const filteredData = {...data, features: filteredDivision()}
    return (
      <section>
        <GeoJSON
        data={filteredData}
        style={style}
        />
      </section>
    )
  } else {
    return null
  }
}

export default ContourLayer