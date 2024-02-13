import { useContext, useEffect, useState } from "react";
import { GeoJSON } from "react-leaflet";
import { useGeoJsonData } from "../../hooks/useGeoJsonData";
import { selectedStyle, defaultStyle, between10and20, between20and35 } from './Style'
import { CollectionContext } from "../../context/collection";
// import usePopulationData from "../../hooks/usePopulationData";
// import { getPublicCollections } from "../../services/collectionService";

const HeatMapLayer = ({ mapDivision, onRegionSelected, districtName, lifeQuality }) => {
  const { collection } = useContext(CollectionContext)
  const data = useGeoJsonData(mapDivision)
  console.log(data)
  const [selectedRegion, setSelectedRegion] = useState(null) 

  useEffect(() => {
    setSelectedRegion(null)
  }, [mapDivision])

  const setStyle = (feature) => {
    const currentGroupId = feature.properties.ID_3
    const currentDistrict = feature.properties.NAME_3
    if ((selectedRegion && selectedRegion.feature.properties.ID_3 === currentGroupId) ||
      (districtName && districtName === currentDistrict)) {
      return selectedStyle
    } else {
      return defaultStyle
    }
  }

  const onEachFeature = (feature, layer) => {
    //console.log({feature, layer})
    layer.on('click', () => {
      // console.log(feature.properties)
      if (mapDivision == 'country') {
        setSelectedRegion((prevSelectedRegion) => {
          return prevSelectedRegion && prevSelectedRegion.feature.properties.ID_0 === feature.properties.ID_0
            ? null
            : layer
        })
       if (onRegionSelected) {
        onRegionSelected(feature.properties.NAME_0)
       }
      } else if (mapDivision == 'division1') {
        setSelectedRegion((prevSelectedRegion) => {
          return prevSelectedRegion && prevSelectedRegion.feature.properties.id === feature.properties.id
            ? null
            : layer
        })
        if (onRegionSelected) {
          onRegionSelected(feature.properties.NAME_1)
         }
      } else if (mapDivision == 'division2') {
        setSelectedRegion((prevSelectedRegion) => {
          return prevSelectedRegion && prevSelectedRegion.feature.properties.ID_2 === feature.properties.ID_2
            ? null
            : layer
        })
        if (onRegionSelected) {
          onRegionSelected(feature.properties.NAME_2)
         }
      } else {
        setSelectedRegion((prevSelectedRegion) => {
          return prevSelectedRegion && prevSelectedRegion.feature.properties.ID_3 === feature.properties.ID_3
            ? null
            : layer
        })
        if (onRegionSelected) {
          onRegionSelected(feature.properties.NAME_3)
         }
      }
    })
  }

  const filteredRegions = (regionName) => {
    return data?.features.filter((region) => region.properties.NAME_1 === regionName)
  }

  if (data) {
    let filteredLifeQualityCompanies = []
    const filteredData = { ...data, features: filteredRegions('Baden-Württemberg') }
    if (collection[0] && collection[0].data && lifeQuality) {
      filteredLifeQualityCompanies = collection[0].data.filter((company) => {
        if (lifeQuality === company.lifeQuality){
          return true
        }
        return false
      }) 
    }

    return (
      <GeoJSON
        data={filteredData}
        onEachFeature={onEachFeature}
        style={(feature) => setStyle(feature)}
      />
    )
  } else {
    return null
  }
}

export default HeatMapLayer