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
    <div className="flex flex-col justify-center items-center">
      <div className='w-full text-center text-2xl mt-12 mb-4'>
        Import CSV File
      </div>
      <div className="w-[812px] flex flex-col">
        <Csv 
          dataType={ dataType }
          reloadData = { reloadData }
        />
        <ControlPanel changeType={ handleTypeChange }/>
        <LatitudeLongitudeComponent/>
      </div >
    </div>
  )
}

UploadCSVComponent.propTypes = {
  reloadData: PropTypes.func
}

export default UploadCSVComponent
