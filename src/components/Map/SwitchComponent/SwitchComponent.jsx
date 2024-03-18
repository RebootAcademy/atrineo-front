import { useEffect, useState } from "react"
import { Label } from "../../ui/Label/Label"
import PropTypes from 'prop-types'

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
      const newValue = !prev
      handleChange(newValue ? 'add' : 'remove', name)
      emitChange(newValue)
      return !prev
    })
  }

  return (
    <div>
      <input 
        type="checkbox" 
        checked={active} 
        className="mr-2" 
        onChange={handleInput}
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