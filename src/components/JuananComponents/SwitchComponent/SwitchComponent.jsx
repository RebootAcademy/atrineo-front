import { useState } from "react"

import { Switch } from "../../ui/Switch/Switch"
import { Label } from "../../ui/Label/Label"

function SwitchComponent({name, handleChange}) {

  const [active, setActive] = useState(false)

  const emitChange = (value) => {
    handleChange(value, name)
  }

  const handleInput = () => {
    setActive(prev => {
      if (!prev === false) {
        handleChange('remove', name)
      }
      return !prev
    })
  }
  
  return (
    <>
      <div>
        <input type="checkbox" checked={active} className="mr-2" onChange={handleInput}/>
        <Label htmlFor={name}>
          {name}
        </Label>
      </div>
      {
        active &&
        <Switch
          id={name}
          className="w-11 h-6"
          onCheckedChange={emitChange}
        />
      }
    </>
  )
}

export default SwitchComponent