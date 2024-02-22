import { useState } from "react"
import { Slider } from "../../ui/Slider/Slider"
import { Label } from "../../ui/Label/Label"

function SliderComponent({ name, handleChange, minValue, maxValue }) {
  const [current, setCurrent] = useState(minValue)
  const emitChange = ([value]) => {
    handleChange(value, name)
    setCurrent(value)
  }

  return (
    <>
      <Label 
        htmlFor={name} 
      >
        {name}
      </Label>
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
  )
}

export default SliderComponent