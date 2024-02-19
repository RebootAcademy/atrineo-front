import { useContext, useEffect, useState } from "react"
import { GeoJSON } from "react-leaflet"
import { useGeoJsonData } from "../../hooks/useGeoJsonData"
import { selectedStyle, defaultStyle } from "./Style"
import { LayerContext } from "../../context/layerContext"

const HeatMapLayer = ({ onRegionSelected }) => {
  const {
    selectedNameDistrict,
    mapDivision
  } = useContext(LayerContext)

  const data = useGeoJsonData(mapDivision)
  const [selectedRegion, setSelectedRegion] = useState(null)

  useEffect(() => {
    setSelectedRegion(null)
  }, [mapDivision])

  const setStyle = (feature) => {
    const currentGroupId = feature.properties.ID_3
    const currentDistrict = feature.properties.NAME_3

    if (
      (selectedRegion && selectedRegion.feature.properties.ID_3 === currentGroupId) ||
      (selectedNameDistrict && selectedNameDistrict[0]?.value.includes(currentDistrict))
    ) {
      return selectedStyle
    } else {
      return defaultStyle
    }
  }

  const onEachFeature = (feature, layer) => {
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
  }

  const filteredRegions = (regionName) => {
    return data?.features.filter(
      (region) => region.properties.NAME_1 === regionName
    )
  }

  if (data) {
    const filteredData = {
      ...data,
      features: filteredRegions("Baden-Württemberg"),
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
