/* eslint-disable no-unused-vars */
import { Switch } from '../../ui/Switch'
import { Label } from '../../ui/Label'

function SwitchComponent ({ id, className, onCheckedChange, checked, label }) {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id={id}
        className={className}
        onCheckedChange={onCheckedChange}
        checked={checked}
      />
      <Label htmlFor={id}>{label}</Label>
    </div>
  )
}

export default SwitchComponent
