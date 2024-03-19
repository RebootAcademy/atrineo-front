import { useContext, useEffect, useState } from "react"
import { GeoJSON } from "react-leaflet"
import { useGeoJsonData } from "../../../hooks/useGeoJsonData"
import { selectedStyle, defaultStyle } from "./Style"
import { LayerContext } from "../../../context/layerContext"
import { isWithinPolygon } from "@/helpers"

// eslint-disable-next-line react/prop-types
const SelectedRegionComponent = ({ data }) => {
  console.log(data)
  const {
    //layers,
    mapDivision,
    searchPolygon
  } = useContext(LayerContext)

  const mapData = useGeoJsonData(mapDivision)
  // eslint-disable-next-line no-unused-vars
  const [selectedRegion, setSelectedRegion] = useState(null)

  useEffect(() => {
    setSelectedRegion(null)
  }, [mapDivision])

  const setStyle = (feature) => {
    const currentDistrict = feature.properties.NAME_3
    console.log(data)
    if (
      // eslint-disable-next-line react/prop-types
      data?.regions?.includes(currentDistrict)
    ) {
      return selectedStyle
    } else {
      return defaultStyle
    }
  }

  const filteredRegions = (regionName) => {
    return mapData?.features.filter(
      (region) => region.properties.NAME_1 === regionName && isWithinPolygon(region, searchPolygon)
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
        // onEachFeature={onEachFeature}
        style={(feature) => setStyle(feature)}
      />
    )
  } else {
    return null
  }
}

export default SelectedRegionComponent
