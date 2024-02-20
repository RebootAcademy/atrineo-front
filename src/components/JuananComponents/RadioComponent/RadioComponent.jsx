import { Label } from "../../ui/Label/Label"
import { RadioGroup, RadioGroupItem } from "../../ui/RadioGroup/radio-group"

function RadioComponent({name, handleChange, options}) {
  return (
    <>
      <Label htmlFor={name}>
        {name}
      </Label>
      <RadioGroup onValueChange={handleChange}>
        {
          options.map(name => {
            return (
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={name} id={name} />
                <Label htmlFor={name}>{name}</Label>
              </div>
            )
          })
        }
      </RadioGroup>
    </>
  )
}

export default RadioComponent