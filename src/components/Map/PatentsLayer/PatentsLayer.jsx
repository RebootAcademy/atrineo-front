import { CollectionContext } from "../../../context/collection";
import { useContext } from "react";

import { Circle } from "react-leaflet";

function PatentsLayer({ layerId }) {
  const { collection } = useContext(CollectionContext)

  const result = collection.flatMap((item) =>
    item.data.map((dataItem) => {
      const radius = !isNaN(dataItem.patents) ? dataItem.patents * 50 : 0;

      return (
        <Circle
          key={dataItem._id}
          center={[dataItem.latitude, dataItem.longitude]}
          pathOptions={{ fillColor: "red", stroke: false, fillOpacity: 0.3 }}
          radius={radius}
        />
      );
    })
  );

  return result;
};

export default PatentsLayer;
