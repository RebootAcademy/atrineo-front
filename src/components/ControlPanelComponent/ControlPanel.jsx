import { Checkbox } from "../ui/Checkbox/Checkbox"
import { Label } from "../ui/Label/Label"
import { RadioGroup, RadioGroupItem } from "../ui/RadioGroup/radio-group"

function ControlPanel() {
  return (
    <div className='flex justify-start gap-4 my-4'>
      <div className="flex items-center">
        <Checkbox />
        <label className="ml-2 mr-2">Display all</label>
      </div>
      <div>Show data by:</div>
      <RadioGroup defaultValue='startups' className='flex items-center'>
        <RadioGroupItem value='startups' id='startups'/>
        <Label htmlFor="startups">Startups</Label>
        <RadioGroupItem value='regions' id='regions' />
        <Label htmlFor="regions">Regions</Label>
      </RadioGroup>
    </div>
      
  )
}

export default ControlPanel