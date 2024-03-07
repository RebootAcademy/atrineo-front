import ControlPanel from "@/components/ControlPanelComponent/ControlPanel"
import Csv from "./Csv"

function UploadCSVComponent() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className='w-full text-center text-2xl mt-12 mb-4'>
        Import CSV File
      </div>
      <div className="w-[900px] flex flex-col">
        <Csv />
        <ControlPanel />
      </div >
    </div>
  )
}

export default UploadCSVComponent
