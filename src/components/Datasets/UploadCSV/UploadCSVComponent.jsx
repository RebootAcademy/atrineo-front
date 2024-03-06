import { Checkbox } from "../../ui/Checkbox/Checkbox"
import { RadioGroup, RadioGroupItem } from "../../ui/RadioGroup/radio-group"
import SearchBar from "./SearchBar"
import SearchFileButton from "./SearchFileButton"
import UpdateButton from "./UpdateButton"

function UploadCSVComponent() {
  return (
    <>
      <div className='flex flex-col items-center text-2xl mt-12 mb-4'>
        Import CSV File
      </div>
      <div>
        <div className='flex justify-center mb-4'>
          <SearchFileButton />
          <SearchBar />
          <UpdateButton/>
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
