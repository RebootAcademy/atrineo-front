import { Popup } from "react-leaflet";
import { useContext } from "react";
import { CollectionContext } from "../../../context/collectionContext";

export default function PopupComponent({name}) {
  const { collection } = useContext(CollectionContext);
  //console.log({ collection: collection })

  //Primero miramos sin collection llega hasta data
  if (!collection || !collection[0] || !collection[0].data) {
    return null
  }

  // Map sobre la colección y genera un Popup para cada startup
  const startUpNames = []
  collection[0]?.data.map((startup) => (
    startUpNames.push(
    <Popup
      key={startup._id}>
      <div className="text-sm">{name}</div>
    </Popup>
    )))
  //console.log(startUpNames)

  return <>{startUpNames}</>;
}

