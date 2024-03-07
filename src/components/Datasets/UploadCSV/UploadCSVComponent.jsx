import { Checkbox } from "../../ui/Checkbox/Checkbox"
import { RadioGroup, RadioGroupItem } from "../../ui/RadioGroup/radio-group"
import Csv from "./Csv"

function UploadCSVComponent() {
  return (
    <>
      <div className='w-full flex flex-col items-center text-2xl mt-12 mb-4'>
        Import CSV File
      </div>
      <div className="flex flex-col">
        <Csv />

        <div className='flex justify-center space-x-4 mb-6 bg-red-200'>
          <div className="">
            <Checkbox />
            <label>Display all</label>
          </div>
          <div>Show data by:</div>
          <RadioGroup className='flex items-center'>
            <RadioGroupItem /><label>Startups</label>
            <RadioGroupItem /><label>Regions</label>
          </RadioGroup>
        </div>
      </div>
    </>
  )
}

export default UploadCSVComponent
