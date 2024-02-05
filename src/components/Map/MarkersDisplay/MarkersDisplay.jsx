import { CollectionContext } from "../../../context/collection"
import { useContext } from "react"
import MarkerComponent from "../MarkerComponent/MarkerComponent"

import { point, polygon } from "@turf/helpers";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";

import PropTypes from 'prop-types'

function MarkersDisplay({ searchPolygon }) {
  const { collection } = useContext(CollectionContext)

  const displayMarkers = () => {
    return collection.flatMap((item) =>
      item.data.filter((dataItem) => {
        const markerCoords = [parseFloat(dataItem.latitude), parseFloat(dataItem.longitude)]
        const markerPoint = point(markerCoords)

        if (searchPolygon && searchPolygon.length > 0) {
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
  searchPolygon: PropTypes.object
}

export default MarkersDisplay
