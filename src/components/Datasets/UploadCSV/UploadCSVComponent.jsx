import PropTypes from 'prop-types'
import { useState } from "react"

import ControlPanel from "@/components/ControlPanelComponent/ControlPanel"
import Csv from "./Csv"
import LatitudeLongitudeComponent from "./LatitudeLongitudeComponent"
import ColumnsModal from '../ColumnsModal/ColumnsModal'

function UploadCSVComponent({ reloadData, columnNames }) {
  const [dataType, setDataType] = useState('startups')

  const handleTypeChange = (value) => {
    setDataType(value)
  }
  return (
    <>
      <div className='flex flex-col items-end mt-2 mr-4'>
        <ColumnsModal columnNames={columnNames}/>
      </div>
      <div className="flex flex-col items-center justify-between items-center">
        <div className='w-full text-center text-2xl mt-6 mb-4'>
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
    </>
  )
}

UploadCSVComponent.propTypes = {
  reloadData: PropTypes.func,
  columnNames: PropTypes.string
}

export default UploadCSVComponent
