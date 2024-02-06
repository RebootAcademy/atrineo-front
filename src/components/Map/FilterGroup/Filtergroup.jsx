import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../ui/Card/Card"
import { useMarkers } from "../../../context/MarkersContext"


function FilterGroup({ title = 'Layers' }) {
  const { showMarkers, toggleMarkersDisplay } = useMarkers()

  return (
    <Card className='mb-2'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className='flex flex-col gap-2'>
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