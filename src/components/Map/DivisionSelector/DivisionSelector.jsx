import { useContext } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select/Select"

import { LayerContext } from '@/context/layerContext'

function DivisionSelector() {
  const { mapDivision, setMapDivision } = useContext(LayerContext)

  const options = [
    { value: 'country', label: 'Country' },
    { value: 'division1', label: 'Division 1' },
    { value: 'division2', label: 'Division 2' },
    { value: 'division3', label: 'Division 3' },
  ]

  const handleChange = (value) => {
    setMapDivision(value)
  }

  return (
    <div className='relative top-4 left-4 z-[9999999999]'>
      <Select value={mapDivision} onValueChange={handleChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Pick a division"/>
        </SelectTrigger>
        <SelectContent>
          {options.map((option, idx) => (
            <SelectItem key={idx} value={option.value}>{option.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default DivisionSelector