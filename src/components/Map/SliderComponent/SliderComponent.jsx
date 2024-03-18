import { useState } from "react"
import PropTypes from 'prop-types'

import { Slider } from "../../ui/Slider/Slider"
import { Label } from "../../ui/Label/Label"

function SliderComponent({ name, handleChange, minValue, maxValue }) {
  const [current, setCurrent] = useState(minValue)
  const [active, setActive] = useState(false)

  const handleInput = () => {
    setActive(prev => {
      if (!prev) {
        // Cuando el checkbox se activa, establece el valor actual al mínimo y emite el cambio.
        setCurrent(minValue)
        handleChange(minValue, name) // Asegúrate de llamar a handleChange con el valor mínimo.
      } else {
        // Cuando el checkbox se desactiva, opcionalmente puedes manejar la lógica para este caso.
        handleChange('remove', name)
        setCurrent(minValue)
      }
      return !prev
    })
  }

  const emitChange = ([value]) => {
    handleChange(value, name)
    setCurrent(value)
  }

  return (
    <>
      <div>
        <input 
          type="checkbox" 
          className="mr-2" 
          onChange={handleInput} 
          checked={active}
        />
        <Label htmlFor={name}>
          {name}
        </Label>
      </div>
      {
        active &&
        <>
          <Slider
            id={name}
            onValueChange={emitChange}
            min={minValue}
            max={maxValue}
          />
          <div className="flex justify-between">
            <div className="text-sm">{minValue}</div>
            <div className="text-sm">{current}</div>
            <div className="text-sm">{maxValue}</div>
          </div>
        </>

      }
    </>
  )
}

SliderComponent.propTypes = {
  name: PropTypes.string,
  handleChange: PropTypes.func,
  minValue: PropTypes.number,
  maxValue: PropTypes.number
}

export default SliderComponent