import { Slider } from "../../ui/Slider/Slider"
import { Label } from "../../ui/Label/Label"

function SliderComponent({ name, handleChange }) {

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
      />
    </>
  )
}

export default SliderComponent