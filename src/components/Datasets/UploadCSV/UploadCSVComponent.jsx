import PropTypes from 'prop-types'
import { useState } from "react"

import ControlPanel from "@/components/ControlPanelComponent/ControlPanel"
import Csv from "./Csv"
import LatitudeLongitudeComponent from "./LatitudeLongitudeComponent"

function UploadCSVComponent({ reloadData }) {
  const [dataType, setDataType] = useState('startups')

  const handleTypeChange = (value) => {
    setDataType(value)
  }
  return (
    <>
      <div className="fixed top-20 left-0 w-full bg-white border-b border-gray-200 shadow-md">
        <div className='flex flex-col items-end mt-2 mr-4'>
        </div>
        <div className="flex flex-col items-center justify-between items-center">
          <div className='w-full text-center text-2xl mt-20 mb-4'>
            Import CSV File
          </div>
          <div className="w-[812px] flex flex-col">
            <Csv
              dataType={dataType}
              reloadData={reloadData}
            />
            <ControlPanel changeType={handleTypeChange} />
            <LatitudeLongitudeComponent />
          </div >
        </div>
      </div>
    </>
  )
}

UploadCSVComponent.propTypes = {
  reloadData: PropTypes.func
}

export default UploadCSVComponent
