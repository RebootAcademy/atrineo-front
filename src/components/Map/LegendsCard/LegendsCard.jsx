import SavedLayerComponent from '../SavedLayerComponent/SavedLayerComponent'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '../../ui/Card/Card'


function LegendsCard() {
  return (
    <Card className='w-full flex flex-col border-0 overflow-y-auto max-h-[700px]'>
      <CardHeader>
        <CardTitle>Legends</CardTitle>
      </CardHeader>

      <CardContent>
        <SavedLayerComponent />
      </CardContent>
    </Card>
  )
}

export default LegendsCard