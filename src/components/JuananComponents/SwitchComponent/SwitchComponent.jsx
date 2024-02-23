import { Switch } from "../../ui/Switch/Switch"
import { Label } from "../../ui/Label/Label"

function SwitchComponent({name, handleChange}) {

  const emitChange = (value) => {
    handleChange(value, name)
  }

  return (
    <>
      <Label htmlFor={name}>
        {name}
      </Label>
      <Switch
        id={name}
        className="w-11 h-6"
        onCheckedChange={emitChange}
      />
    </>
  )
}

export default SwitchComponent