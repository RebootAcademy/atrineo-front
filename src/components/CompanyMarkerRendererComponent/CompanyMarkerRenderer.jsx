import MarkerComponent from "../ui/MarkerComponent/MarkerComponent"

//este componente lo que hace es renderizar los marcadores de las companias
//que se le pasan por props
function CompanyMarkerRenderer({ companies }) {

  const renderCompanyMarkers = () => {
    return companies?.map((company) => {
      return <MarkerComponent
        key={company._id}
        info={company.name}
        coords={{ latitude: company.latitude, longitude: company.longitude }}
      />
    })
  }

  return renderCompanyMarkers()
}

export default CompanyMarkerRenderer