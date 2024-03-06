import SavedLayerComponent from '../SavedLayerComponent/SavedLayerComponent'
import {
  CardHeader,
  CardTitle
} from '../../ui/Card/Card'


function LegendsCard() {
  return (
    <div className='w-full flex flex-col border-0'>
      <CardHeader>
        <CardTitle>Legends</CardTitle>
      </CardHeader>
      <div className='overflow-y-auto max-h-[700px]'>
        <SavedLayerComponent />
      </div>
    </div>
  )
}

export default LegendsCard