import PropTypes from 'prop-types'
import CSVReader from 'react-csv-reader'
import { useRef, useState } from 'react'

import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner'

import { Button } from '@/components/ui/Button/Button'

import { uploadCsv } from '../../../services/uploadData'

function Csv({ dataType, reloadData }) {
  const fileInputRef = useRef(null)
  const [fileName, setFileName] = useState('')
  const [dataBody, setDataBody] = useState({})
  const [showUpdateSpinner, setShowUpdateSpinner] = useState(false)


  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  const uploadDataFile = async () => {
    try {
      setShowUpdateSpinner(true)
      const res = await uploadCsv(dataBody, dataType, fileName)
      if (res) {
        console.log(res)
        reloadData()
      }
    } catch (error) {
      console.error(error)
    } finally {
      setShowUpdateSpinner(false)
    }
  }

  const handleCSVUpload = async (data, fileInfo) => {
    console.log("Data:", data)
    setFileName(fileInfo.name)
    setDataBody(data)
    console.log("File Information:", fileInfo)
  }

  return (
    <div className='flex justify-center w-full'>
      <div className='flex mr-2 border rounded-md w-full mx-8'>
        <button onClick={handleButtonClick} className='rounded-l-md bg-primary text-white px-4 text-sm'>Search File</button>
        <div className='w-[600px] rounded-r-md flex items-center pl-3 text-sm'>
          {fileName ? fileName : "File not found"}
        </div>
      </div>
      <Button onClick={uploadDataFile}>Update</Button>
      <CSVReader
        ref={fileInputRef}
        onFileLoaded={handleCSVUpload}
        parserOptions={{ header: true, dynamicTyping: true, skipEmptyLines: true }}
        cssClass='hidden'
      />
      {
        showUpdateSpinner && (
          <div className='absolute inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50'>
            <LoadingSpinner width="50" height="50" />
          </div>
        )
      }
    </div>
  )
}

Csv.propTypes = {
  dataType: PropTypes.string,
  reloadData: PropTypes.func
}

export default Csv