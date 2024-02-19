import { CollectionContext } from "../../../context/collection"
import { useContext } from "react"
import { LayerContext } from "../../../context/layerContext"
import { isWithinPolygon } from "../../../helpers"
import MarkerComponent from "../MarkerComponent/MarkerComponent"

function MarkersDisplay() {
  const { collection } = useContext(CollectionContext)
  const { isFinancingFilterActive, isGovFundsReceivedActive, searchPolygon } = useContext(LayerContext)

  const displayMarkers = () => {
    return collection.flatMap((item) =>
      item.data
        // Primero, verifica si el filtro de financiamiento está activo antes de aplicar cualquier filtrado
        .filter((dataItem) => !isFinancingFilterActive || dataItem.financingAccess)
        .filter((dataItem) => !isGovFundsReceivedActive || dataItem.govFundsReceived)
        .filter((dataItem) => isWithinPolygon(dataItem, searchPolygon))
        // .filter((company) => selectedRegion === "" || company.locationId[mapDivision]?.name === selectedRegion)
        .map((filteredDataItem, index) => (
          <MarkerComponent
            key={index}
            coords={{ latitude: filteredDataItem.latitude, longitude: filteredDataItem.longitude }}
            name={filteredDataItem.name}
          />
        ))
    )
  }

  return displayMarkers()
}

export default MarkersDisplay
