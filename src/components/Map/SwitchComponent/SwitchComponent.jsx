import { useEffect, useState } from "react"
import PropTypes from 'prop-types'

import { Switch } from "../../ui/Switch/Switch"
import { Label } from "../../ui/Label/Label"

function SwitchComponent({ name, handleChange, isActive }) {
  const [active, setActive] = useState(isActive)

  useEffect(() => {
    setActive(isActive)
  }, [isActive])

  const emitChange = (value) => {
    handleChange(value, name)
  }

  const handleInput = () => {
    setActive(prev => {
      if (prev) {
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

SwitchComponent.propTypes = {
  name: PropTypes.string,
  handleChange: PropTypes.func,
  isActive: PropTypes.bool
}

export default SwitchComponent