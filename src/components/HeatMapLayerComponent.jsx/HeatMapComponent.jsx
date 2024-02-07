import { useContext, useEffect, useState } from "react";
import { GeoJSON } from "react-leaflet";
import { useGeoJsonData } from "../../hooks/useGeoJsonData";
import { selectedStyle, defaultStyle, between10and20, between20and35 } from './Style'
// import usePopulationData from "../../hooks/usePopulationData";


// import { getPublicCollections } from "../../services/collectionService";

const HeatMapLayer = ({ mapDivision, onRegionSelected }) => {
  const data = useGeoJsonData(mapDivision)

  const [selectedRegion, setSelectedRegion] = useState(null)

  // const { groupDataWithDivision3, groupDataWithoutDivision3 } = usePopulationData({})

  // const getPopulationByDivision3 = () => {
  //   //creamos un objeto vacío llamado populationByDivision3
  //   const populationByDivision3 = {}
  //   //aquí se itera por las claves (keys) del objeto groupDataWithDivision3
  //   for (const key in groupDataWithDivision3) {
  //     //para cada clave (key) obtenemos un valor asociado a esa clave
  //     const id = key
  //     //aquí se accede a la propiedad totalPopulation del objeto asociado a la clave por la que se está iterando
  //     const totalPopulation = groupDataWithDivision3[key].totalPopulation
  //     //da el valor de totalPopulation al objeto populationByDivision3 usando la clave id
  //     populationByDivision3[id] = totalPopulation
  //   }
  //   return populationByDivision3
  // }

  // const setStyle = (feature) => {
  //   //Obtenemos la población del estado actual
  //   const populationByDivision3 = getPopulationByDivision3()
  //   const currentGroupId = feature.properties.ID_3
  //   const population = populationByDivision3[currentGroupId]

  //   //asignar colores en base a los tramos de población
  //   if (selectedRegion && selectedRegion.feature.properties.ID_3 === currentGroupId) {
  //     return selectedStyle
  //   } else {
  //     if (population < 10000000) {
  //       return below10
  //     } else if (population >= 10000000 & population < 20000000) {
  //       return between10and20
  //     } else if (population >= 20000000 & population < 35000000) {
  //       return between20and35
  //     } else if (population > 35000000) {
  //       return over35
  //     } else {
  //       return defaultStyle
  //     }
  //   }
  // }

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