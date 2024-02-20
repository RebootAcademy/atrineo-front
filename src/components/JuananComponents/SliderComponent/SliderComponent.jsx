import { Slider } from "../../ui/Slider/Slider"
import { Label } from "../../ui/Label/Label"

function SliderComponent({ name, handleChange }) {
  return (
    <>
      <Label 
        htmlFor={name} 
      >
        {name}
      </Label>
      <Slider
        id={name}
        onValueChange={handleChange}
      />
    </>
  )
}

export default SliderComponent