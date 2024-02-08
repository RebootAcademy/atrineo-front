import { useContext } from "react"
import { CollectionContext } from "../../../context/collection"
import { LayerContext } from "../../../context/layerContext"
import { Circle } from "react-leaflet"

import { point, polygon } from "@turf/helpers"
import booleanPointInPolygon from "@turf/boolean-point-in-polygon"

function PatentsLayer({ searchPolygon, isFinancingFilterActive, isGovFundsReceivedActive }) {
  const { collection } = useContext(CollectionContext)
  const { patentsFilter } = useContext(LayerContext)

  const filteredItems = collection.flatMap(item =>
    item.data
      .filter((dataItem) => !isFinancingFilterActive || dataItem.financingAccess)
      .filter((dataItem) => !isGovFundsReceivedActive || dataItem.govFundsReceived)
      .filter(dataItem => {
        const meetsPatentCriteria = !isNaN(dataItem.patents) && dataItem.patents <= patentsFilter;
        const hasValidCoordinates = dataItem.latitude != null && dataItem.longitude != null;
        if (meetsPatentCriteria && hasValidCoordinates) {
          if (searchPolygon && searchPolygon.length > 0) {
            const itemCoords = [parseFloat(dataItem.longitude), parseFloat(dataItem.latitude)];
            const itemPoint = point(itemCoords);
            const polygonCoordinates = searchPolygon[0].map(coord => [coord.lng, coord.lat]);
            polygonCoordinates.push(polygonCoordinates[0]); // Cierra el polígono

            return booleanPointInPolygon(itemPoint, polygon([polygonCoordinates]));
          }
          return true;
        }
        return false;
      })
  );

  const circles = filteredItems.map(filteredItem => (
    <Circle
      key={filteredItem._id}
      center={[filteredItem.latitude, filteredItem.longitude]}
      pathOptions={{ fillColor: "red", stroke: false, fillOpacity: 0.3 }}
      radius={filteredItem.patents * 100}
    />
  ))

  return <>{circles}</>;
}

export default PatentsLayer;
