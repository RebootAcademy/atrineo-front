import { CollectionContext } from "../../context/collection"
import { useContext } from "react"
import { useGeoJsonData } from "../../hooks/useGeoJsonData";
import MarkerComponent from "../ui/MarkerComponent/MarkerComponent"
import PropTypes from 'prop-types'
import { useState } from "react";
import HeatMapLayer from "../HeatMapLayerComponent.jsx/HeatMapComponent";

function FilterData({ mapDivision, selectedRegion }) {
  const { collection } = useContext(CollectionContext)
  const data = useGeoJsonData(mapDivision)

  const [clickedZone, setClickedZone] = useState()

  const renderCompanyMarkers = () => {
    const companyMarkers = []
    collection[0]?.data?.forEach((company) => {
      if (!selectedRegion || company.locationId[mapDivision]?.name === selectedRegion) {
        companyMarkers.push(<MarkerComponent
          key={company._id}
          info={company.name}
          coords={{ latitude: company.latitude, longitude: company.longitude }}
        />)
      }
    })
    return companyMarkers
  }
  return renderCompanyMarkers()
}

const connectCompanyMap = (mapDivision, clickedZone, feature, layer) => {
  layer.on('click', () => {
    
  })
}



//es string por ahora, el objetivo es que sea un valor dinámico 
FilterData.propTypes = {
  mapDivision: PropTypes.string.isRequired,
  selectedRegion: PropTypes.string.isRequired,
};

export default FilterData