/* eslint-disable no-unused-vars */
import { Slider } from '../../ui/Slider/Slider'
import { Label } from '../../ui/Label/Label'

function SliderComponent ({ id, onValueChange, value, label }) {
  return (
    <div className="flex flex-col items-center space-x-2 gap-2">
      <Label>{label}</Label>
      <Slider
        id={id}
        onValueChange={onValueChange}
        defaultValue={value}
      />
      <div>{value}</div>
    </div>
  )
}

export default SliderComponent
