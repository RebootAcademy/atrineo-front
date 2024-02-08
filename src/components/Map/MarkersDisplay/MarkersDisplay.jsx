import { CollectionContext } from "../../../context/collection"
import { useContext } from "react"
import MarkerComponent from "../MarkerComponent/MarkerComponent"

import { point, polygon } from "@turf/helpers";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";

import PropTypes from 'prop-types'
import { LayerContext } from "../../../context/layerContext";

function MarkersDisplay({ searchPolygon }) {
  const { collection } = useContext(CollectionContext)
  const { isFinancingFilterActive, isGovFundsReceivedActive } = useContext(LayerContext)

  const displayMarkers = () => {
    return collection.flatMap((item) =>
      item.data
        // Primero, verifica si el filtro de financiamiento está activo antes de aplicar cualquier filtrado
        .filter((dataItem) => !isFinancingFilterActive || dataItem.financingAccess)
        .filter((dataItem) => !isGovFundsReceivedActive || dataItem.govFundsReceived)
        .filter((dataItem) => {
        // Luego, aplica el filtrado basado en el polígono si es necesario
          if (searchPolygon && searchPolygon.length > 0) {
            const markerCoords = [parseFloat(dataItem.latitude), parseFloat(dataItem.longitude)]
            const markerPoint = point(markerCoords)
            const polygonCoordinates = searchPolygon[0].map(coord => [coord.lat, coord.lng]);
            polygonCoordinates.push(polygonCoordinates[0])

            if (polygonCoordinates.length >= 4) {
              return booleanPointInPolygon(markerPoint, polygon([polygonCoordinates]));
            }
          }
          return true
        })
        .map((filteredDataItem, index) => (
          <MarkerComponent
            key={index}
            coords={{ latitude: filteredDataItem.latitude, longitude: filteredDataItem.longitude }}
          />
        ))
    )
  }

  return displayMarkers()
}

MarkersDisplay.propTypes = {
  searchPolygon: PropTypes.array
}

export default MarkersDisplay
