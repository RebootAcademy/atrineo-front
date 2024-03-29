import { useState } from "react"
import PropTypes from 'prop-types'

import { Label } from "../../ui/Label/Label"
import { RadioGroup, RadioGroupItem } from "../../ui/RadioGroup/radio-group"

function RadioComponent({name, handleChange, options}) {

  const [active, setActive] = useState(false)

  const handleInput = () => {
    setActive(prev => {
      if (prev) {
        handleChange('remove', name)
      }
      return !prev
    })
  }
  
  const emitChange = (value) => {
    handleChange(value, name)
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
        <RadioGroup onValueChange={emitChange}>
          {
            options.map((name, index) => {
              return (
                <div key={index} className="flex items-center space-x-2 ml-4">
                  <RadioGroupItem value={name} id={name} />
                  <Label htmlFor={name}>{name}</Label>
                </div>
              )
            })
          }
        </RadioGroup>
      }
    </>
  )
}

RadioComponent.propTypes = {
  name: PropTypes.string,
  handleChange: PropTypes.func,
  options: PropTypes.array
}

export default RadioComponent