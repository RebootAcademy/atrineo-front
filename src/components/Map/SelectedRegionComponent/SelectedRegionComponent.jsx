import { useContext, useEffect, useState } from "react"
import { GeoJSON } from "react-leaflet"
import { useGeoJsonData } from "../../../hooks/useGeoJsonData"
import { selectedStyle, defaultStyle } from "./Style"
import { LayerContext } from "../../../context/layerContext"

 
const RegionsSelected = () => {
  const {
    layers,
    mapDivision
  } = useContext(LayerContext)

  const mapData = useGeoJsonData(mapDivision)
  // eslint-disable-next-line no-unused-vars
  const [selectedRegion, setSelectedRegion] = useState(null)

  useEffect(() => {
    setSelectedRegion(null)
  }, [mapDivision])

  const setStyle = (feature) => {
    //const currentGroupId = feature.properties.ID_3
    const currentDistrict = feature.properties.NAME_3

    if (
      layers?.find((layer) => layer.data.regions?.includes(currentDistrict) && layer.isVisible)
      // (selectedNameDistrict.length === 1 && selectedNameDistrict[0].value === 'All') ||
      //selectedNameDistrict.includes(currentDistrict)
      //la linea de abajo comentada es para activar que al hacer click en el mapa se pinte la zona donde se hace click
      //(selectedRegion && selectedRegion.feature.properties.ID_3 === currentGroupId) ||
      //(selectedNameDistrict && selectedNameDistrict.some(district => district.value === currentDistrict))
    ) {
      return selectedStyle
    } else {
      return defaultStyle
    }
  }

  /*   const onEachFeature = (feature, layer) => {
    layer.on("click", () => {
      if (mapDivision == "country") {
        setSelectedRegion((prevSelectedRegion) => {
          return prevSelectedRegion &&
            prevSelectedRegion.feature.properties.ID_0 ===
            feature.properties.ID_0
            ? null
            : layer
        })
        if (onRegionSelected) {
          onRegionSelected(feature.properties.NAME_0)
        }
      } else if (mapDivision == "division1") {
        setSelectedRegion((prevSelectedRegion) => {
          return prevSelectedRegion &&
            prevSelectedRegion.feature.properties.id === feature.properties.id
            ? null
            : layer
        })
        if (onRegionSelected) {
          onRegionSelected(feature.properties.NAME_1)
        }
      } else if (mapDivision == "division2") {
        setSelectedRegion((prevSelectedRegion) => {
          return prevSelectedRegion &&
            prevSelectedRegion.feature.properties.ID_2 ===
            feature.properties.ID_2
            ? null
            : layer
        })
        if (onRegionSelected) {
          onRegionSelected(feature.properties.NAME_2)
        }
      } else {
        setSelectedRegion((prevSelectedRegion) => {
          return prevSelectedRegion &&
            prevSelectedRegion.feature.properties.ID_3 ===
            feature.properties.ID_3
            ? null
            : layer
        })
        if (onRegionSelected) {
          onRegionSelected(feature.properties.NAME_3)
        }
      }
    })
  } */

  const filteredRegions = (regionName) => {
    return mapData?.features.filter(
      (region) => region.properties.NAME_1 === regionName
    )
  }

  if (mapData) {
    const filteredData = {
      ...mapData,
      features: filteredRegions("Baden-Württemberg"),
    }

    return (
      <GeoJSON
        data={filteredData}
        /* onEachFeature={onEachFeature} */
        style={(feature) => setStyle(feature)}
      />
    )
  } else {
    return null
  }
}

export default RegionsSelected
