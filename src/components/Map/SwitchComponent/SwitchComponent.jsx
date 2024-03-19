import { useEffect, useState } from "react"
import { Label } from "../../ui/Label/Label"
import PropTypes from 'prop-types'

function SwitchComponent({ name, handleChange, isActive }) {
  const [isChecked, setIsChecked] = useState(isActive)

  useEffect(() => {
    setIsChecked(isActive)
  }, [isActive])

  const handleCheck = () => {
    setIsChecked(!isChecked)
    handleChange(!isChecked ? name : 'remove', name)
  }

  return (
    <div>
      <input
        type="checkbox"
        checked={isChecked}
        className="mr-2"
        onChange={handleCheck}
      />
      <Label htmlFor={name}>{name}</Label>
    </div>
  )
}

SwitchComponent.propTypes = {
  name: PropTypes.string,
  handleChange: PropTypes.func,
  isActive: PropTypes.bool
}

export default SwitchComponent