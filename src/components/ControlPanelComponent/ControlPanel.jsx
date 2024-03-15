import PropTypes from 'prop-types'

import { Checkbox } from "../ui/Checkbox/Checkbox"
import { Label } from "../ui/Label/Label"
import { RadioGroup, RadioGroupItem } from "../ui/RadioGroup/radio-group"

function ControlPanel({ changeType }) {
  return (
    <div className='flex justify-start gap-4 my-4 text-sm'>
      <div className="flex items-center ml-1">
        <Checkbox />
        <label className="ml-2 mr-2">Display all</label>
      </div>
      <div>Show data by:</div>
      <RadioGroup 
        defaultValue='startups' 
        className='flex items-center'
        onValueChange={ changeType }
      >
        <RadioGroupItem value='startups' id='startups'/>
        <Label htmlFor="startups">Startups</Label>
        <RadioGroupItem value='regions' id='regions' />
        <Label htmlFor="regions">Regions</Label>
      </RadioGroup>
    </div>
      
  )
}

ControlPanel.propTypes = {
  changeType: PropTypes.func
}

export default ControlPanel
