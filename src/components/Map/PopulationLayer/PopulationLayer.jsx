import { useContext } from "react"
import { CollectionContext } from "../../../context/collection"
import { LayerContext } from "../../../context/layerContext"
import { Circle } from "react-leaflet"
import { useDistrictsCoords } from "../../../hooks/useDistrictCoords"
import { useContext } from "react"
import { LayerContext } from "../../../context/layerContext"
import { isWithinPolygon } from "../../../helpers"

function PopulationLayer() {
  const { populationFilter, searchPolygon } = useContext(LayerContext)
  const data = useDistrictsCoords({}) || []

  const filteredItems = data
    .filter((dataItem) => !isNaN(dataItem.districtPopulation) && dataItem.districtPopulation <= populationFilter
    .filter((dataItem) => isWithinPolygon(dataItem, searchPolygon))
  )

  const circles = filteredItems.map((filteredItem, index) => (
    <Circle
      key={index}
      center={[filteredItem.latitude, filteredItem.longitude]}
      pathOptions={{ fillColor: 'dodgerBlue', stroke: false, fillOpacity: 0.15 }}
      radius={(filteredItem.districtPopulation) / 150}
    />
  ))

  return <>{circles}</>
}

export default PopulationLayer
