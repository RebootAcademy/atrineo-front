import { Button } from "../../ui/Button/Button"
import { Checkbox } from "../../ui/Checkbox/Checkbox"
import { Input } from "../../ui/Input/input"
import { RadioGroup, RadioGroupItem } from "../../ui/RadioGroup/radio-group"

function UploadCSVComponent() {
  const uploadIcon = <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="upload">
      <path id="Vector" d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10M11.3333 5.33333L8 2M8 2L4.66667 5.33333M8 2V10" stroke="#09090B" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>

  return (
    <>
      <div className='flex flex-col items-center text-2xl mt-12 mb-4'>
        Import CSV File
      </div>
      <div>
        <div className='flex justify-center mb-4'>
          <div>
            <Button className='w-32 space-x-2'>{uploadIcon}<label>Search file</label></Button>
          </div>
          <Input className='mr-6 md:w-1/2 lg:w-1/2' />
          <Button className='md:w-1/6 lg:w-1/6 xl:w-1/6 text-neutral-500' variant='outline'>Update</Button>
        </div>
        <div className='flex space-x-4 mb-6'>
          <div>
            <Checkbox className='ml-32 mr-2' />
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