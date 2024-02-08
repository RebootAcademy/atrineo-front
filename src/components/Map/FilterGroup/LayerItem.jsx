import { useContext } from "react";
import { LayerContext } from "../../../context/layerContext";
import { CollapsibleTrigger } from "../../ui/Collapsible/Collapsible";

function LayerItem({ layer }) {
  const { showMarkers, toggleMarkersDisplay } = useContext(LayerContext);

  return (
    <div className="flex gap-2 mb-2">
      <input
        type="checkbox"
        id={layer.id}
        checked={showMarkers[layer.id] || false}
        onChange={() => toggleMarkersDisplay(layer.id)}
      />
      <label
        htmlFor={layer.id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        <CollapsibleTrigger className="text-lg font-bold mb-2">{layer.name}</CollapsibleTrigger>
      </label>
    </div>
  )
}

export default LayerItem;