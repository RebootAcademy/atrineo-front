/* eslint-disable no-unused-vars */
import SavedLayerComponent from '../SavedLayerComponent/SavedLayerComponent'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '../../ui/Card/Card'


function LegendsCard() {
  return (
    <Card className='w-full flex flex-col border-0'>
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