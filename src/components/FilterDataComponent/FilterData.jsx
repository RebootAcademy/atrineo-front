import { CollectionContext } from "../../context/collection"
import { useContext } from "react"
import { useGeoJsonData } from "../../hooks/useGeoJsonData";
import MarkerComponent from "../ui/MarkerComponent/MarkerComponent"
import PropTypes from 'prop-types'

//pasar por props el filtro que queremos que se vea 
function FilterData({ mapDivision, selectedRegion, gnp, showPopulation }) {
  console.log(showPopulation)
  const { collection } = useContext(CollectionContext)
  // console.log(collection)
  const data = useGeoJsonData(mapDivision)

  //esto se hace asi para poder ir filtrando todos los datos que queremos ya sean cuantitativos o cualitativos
  const renderCompanyMarkers = () => {
    let filteredCompanies = collection[0]?.data?.filter((company) => {
      return !selectedRegion || company.locationId[mapDivision]?.name === selectedRegion
    })

    filteredCompanies = filteredCompanies?.filter((company) => {
      return (gnp && company.hasOwnProperty('gnp')) || !gnp
    })
    filteredCompanies = filteredCompanies?.filter((company) => {
      return (showPopulation && company.hasOwnProperty('districtPopulation')) || !showPopulation
    })




    const markers = filteredCompanies?.map((company) => {
      return <MarkerComponent
        key={company._id}
        info={company.name}
        coords={{ latitude: company.latitude, longitude: company.longitude }}
      />
    })

    return markers
  }
  return renderCompanyMarkers()
}

//es string por ahora, el objetivo es que sea un valor dinámico 
FilterData.propTypes = {
  mapDivision: PropTypes.string.isRequired,
  selectedRegion: PropTypes.string.isRequired,
};

export default FilterData