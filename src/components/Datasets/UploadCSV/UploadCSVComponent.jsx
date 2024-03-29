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

      <div className='flex flex-col items-end mt-2 mr-4'>
      </div>
      <div className="flex flex-col items-center justify-between">
        <div className='w-full text-center text-2xl mt-6 mb-4'>
          Import CSV File
        </div>
        <div className="w-3/4 flex flex-col">
          <Csv
            dataType={dataType}
            reloadData={reloadData}
          />
          <ControlPanel changeType={handleTypeChange} />
          <LatitudeLongitudeComponent />
        </div >
      </div>
    </>
  )
}

UploadCSVComponent.propTypes = {
  reloadData: PropTypes.func
}

export default UploadCSVComponent
