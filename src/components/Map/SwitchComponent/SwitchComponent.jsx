import { useEffect, useState } from "react"
import { Label } from "../../ui/Label/Label"
import PropTypes from 'prop-types'

function SwitchComponent({ name, handleChange, isActive }) {
  const [active, setActive] = useState(isActive)

  useEffect(() => {
    setActive(active)
  }, [active])

  const handleCheck = () => {
    setActive(prev => !prev)
    handleInput()
  }

  const handleInput = () => {
    if (active) {
      handleChange('remove', name)
    } else {
      handleChange(!active, name)
    }
  }

  return (
    <div>
      <input 
        type="checkbox" 
        checked={active} 
        className="mr-2" 
        onChange={handleCheck}
      />
      <Label htmlFor={name}>
        {name}
      </Label>
    </div>
  )
}

SwitchComponent.propTypes = {
  name: PropTypes.string,
  handleChange: PropTypes.func,
  isActive: PropTypes.bool
}

export default SwitchComponent