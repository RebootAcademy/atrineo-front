import { Slider } from "../../ui/Slider/Slider"
import { Label } from "../../ui/Label/Label"

function SliderComponent({ name, handleChange, minValue, maxValue }) {

  const emitChange = ([value]) => {
    handleChange(value, name)
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
        <div className="text-sm">{maxValue}</div>
      </div>
    </>
  )
}

export default SliderComponent