import { useState } from "react"
import PropTypes from 'prop-types'

// import { Slider } from "../../ui/Slider/Slider"
import * as Slider from '@radix-ui/react-slider'
import { Label } from "../../ui/Label/Label"
import './SliderComponent.css'

function SliderComponent({ name, handleChange, minValue, maxValue }) {
  const [current, setCurrent] = useState(minValue)
  const [max, setMax] = useState(maxValue)
  const [active, setActive] = useState(false)

  const handleInput = () => {
    setActive(prev => {
      if (!prev) {
        // Cuando el checkbox se activa, establece el valor actual al mínimo y emite el cambio.
        setCurrent(minValue)
        handleChange([minValue, maxValue], name) // Asegúrate de llamar a handleChange con el valor mínimo.
      } else {
        // Cuando el checkbox se desactiva, opcionalmente puedes manejar la lógica para este caso.
        handleChange('remove', name)
        setCurrent(minValue)
      }
      return !prev
    })
  }

  const emitChange = (values) => {
    handleChange(values, name)
    setCurrent(values[0])
    setMax(values[1])
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
          {/* <Slider
            id={name}
            onValueChange={emitChange}
            min={minValue}
            max={maxValue}
            step={ maxValue >= 1 ? 1 : 0.01 }
            defaultValue={[minValue, maxValue]}
          /> */}
          <Slider.Root
            id={name}
            defaultValue={[minValue, maxValue]} 
            className="SliderRoot w-full" 
            step={ maxValue >= 1 ? 1 : 0.01}
            min={minValue}
            max={maxValue}
            minStepsBetweenThumbs={maxValue >= 1 ? 1 : 0.01}
            onValueChange={emitChange}
          >
            <Slider.Track className="SliderTrack">
              <Slider.Range className="SliderRange bg-primary"/>
            </Slider.Track>
            <Slider.Thumb className="SliderThumb"/>
            <Slider.Thumb className="SliderThumb"/>
          </Slider.Root>
          <div className="flex justify-between">
            <div className="text-sm">{minValue}</div>
            <div className="text-sm">{current}</div>
            <div className="text-sm">{max}</div>
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