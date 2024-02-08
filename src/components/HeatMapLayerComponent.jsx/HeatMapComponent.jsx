import { useContext, useEffect, useState } from "react";
import { GeoJSON } from "react-leaflet";
import { useGeoJsonData } from "../../hooks/useGeoJsonData";
import { selectedStyle, defaultStyle, between10and20, between20and35 } from './Style'
// import usePopulationData from "../../hooks/usePopulationData";


// import { getPublicCollections } from "../../services/collectionService";

const HeatMapLayer = ({ mapDivision, onRegionSelected }) => {
  const data = useGeoJsonData(mapDivision)

  const [selectedRegion, setSelectedRegion] = useState(null)

  useEffect(() => {
    setSelectedRegion(null)
  }, [mapDivision])

  const onEachFeature = (feature, layer) => {
    //console.log({feature, layer})
    layer.on('click', () => {
      console.log(feature)
      if (mapDivision == 'country') {
        setSelectedRegion((prevSelectedRegion) => {
          return prevSelectedRegion && prevSelectedRegion.feature.properties.ID_0 === feature.properties.ID_0
            ? null
            : layer
        })
        onRegionSelected(feature.properties.NAME_0)
      } else if (mapDivision == 'division1') {
        setSelectedRegion((prevSelectedRegion) => {
          return prevSelectedRegion && prevSelectedRegion.feature.properties.id === feature.properties.id
            ? null
            : layer
        })
        onRegionSelected(feature.properties.NAME_1)
      } else if (mapDivision == 'division2') {
        setSelectRegion((prevSelectedRegion) => {
          return prevSelectedRegion && prevSelectedRegion.feature.properties.ID_2 === feature.properties.ID_2
            ? null
            : layer
        })
        onRegionSelected(feature.properties.NAME_2)
      } else {
        setSelectedRegion((prevSelectedRegion) => {
          return prevSelectedRegion && prevSelectedRegion.feature.properties.ID_3 === feature.properties.ID_3
            ? null
            : layer
        })
        onRegionSelected(feature.properties.NAME_3)
      }
    })
  }

  const filteredRegions = (regionName) => {
    return data?.features.filter((region) => region.properties.NAME_1 === regionName)
  }

  if (data) {
    const filteredData = { ...data, features: filteredRegions('Baden-Württemberg') }

    return (
      <GeoJSON
        data={filteredData}
        onEachFeature={onEachFeature}
        // style={(feature) => setStyle(feature)}
      />
    )
  } else {
    return null
  }
}

export default HeatMapLayer