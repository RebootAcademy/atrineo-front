import { Circle } from "react-leaflet"

//es company y no feature porque en el json de datos son datos de empresas
//la unica responsabilidad de este componente es pintar los circulos de las empresas segun poblacion en la que se encuentre
function PopulationCircleRenderer({ companies, showPopulation }) {
  const renderCircles = () => {
    if (showPopulation) {
      return companies.map((company, index) => (
        <Circle
          key={index}
          center={[company.latitude, company.longitude]}
          pathOptions={{ fillColor: 'orange', stroke: false, fillOpacity: 0.6 }}
          radius={company.districtPopulation / 500}
        />
      ))
    } else return null
  }
  return renderCircles()
}

export default PopulationCircleRenderer;