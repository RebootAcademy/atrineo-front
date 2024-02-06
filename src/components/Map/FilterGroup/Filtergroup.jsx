import { Checkbox } from "../../ui/Checkbox/Checkbox"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../ui/Card/Card"
import MarkersDisplay from "../MarkersDisplay/MarkersDisplay"
import MarkerClusterGroup from 'react-leaflet-cluster'
import { useMarkers } from "../../../context/MarkersContext"


function FilterGroup({ title = 'Layers', searchPolygon }) {
  const { showMarkers, toggleMarkersDisplay } = useMarkers()

  return (
    <Card className='mb-2'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className='flex flex-col gap-2'>
        {showMarkers && (
          <MarkerClusterGroup
            chunkedLoading
            polygonOptions={{ weight: 0 }}
            iconCreateFunction={function (cluster) {
              return L.divIcon({
                html: `<span>${cluster.getChildCount()}</span>`,
                className: 'rounded-full text-white text-sm font-bold text-center bg-radial-custom', // Clase personalizada
                iconSize: L.point(40, 40, true),
              })
            }}
          >
            <MarkersDisplay searchPolygon={searchPolygon} />
          </MarkerClusterGroup>
        )}

        <div className="flex gap-2">
          <input 
            type="checkbox" 
            id="startups" 
            checked={showMarkers} 
            onChange={toggleMarkersDisplay}
          />
          <label
            htmlFor="startups"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Startups
          </label>
        </div>

      </CardContent>
    </Card>
  )
}

export default FilterGroup