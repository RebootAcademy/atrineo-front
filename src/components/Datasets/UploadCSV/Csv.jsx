import PropTypes from 'prop-types'
import CSVReader from 'react-csv-reader'
import { useRef, useState } from 'react'

import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner'

import { Button } from '@/components/ui/Button/Button'

import { addDataChunck } from '../../../services/uploadData'
import { cleanDataFromCollection } from '@/services/data.service'

function Csv({ dataType, reloadData }) {
  const fileInputRef = useRef(null)
  const [fileName, setFileName] = useState('')
  const [dataBody, setDataBody] = useState({})
  const [showUpdateSpinner, setShowUpdateSpinner] = useState(false)
  const [loadPercentage, setLoadPercentage] = useState(0)
  const [displayError, setDisplayError] = useState('')

  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  function chunkArray(array, chunkSize) {
    const chunks = []
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize))
    }
    return chunks
  }

  const uploadDataFile = async () => {
    try {
      if (displayError.length !== 0) {
        setDisplayError('')
      }
      if (loadPercentage > 0) {
        setLoadPercentage(0)
      }
      setShowUpdateSpinner(true)
      const cleaned = await cleanDataFromCollection(import.meta.env.VITE_DEMO_ID)
      if (!cleaned) {
        console.log('Error cleaning up')
        console.error(cleaned)
      }

      const chunks = chunkArray(dataBody, 100)
      const totalChunks = chunks.length
      let counter = 1
      const uploadPromises = chunks.map(async (chunk, index) => {
        const res = await addDataChunck(import.meta.env.VITE_DEMO_ID, chunk, dataType, fileName, index === 0 ? true : false)
        const percentComplete = (counter / totalChunks) * 100
        counter++
        setLoadPercentage(percentComplete.toFixed(2))
        return res
      })

      // Wait for all uploads to finish
      const results = await Promise.all(uploadPromises)
      if (results) {
        results.forEach((res) => {
          console.log(res)
        })
        reloadData()
      }

    } catch (error) {
      console.error(error)
      setDisplayError(error.message)
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
          <div className='absolute inset-0 flex flex-col justify-center items-center bg-gray-500 bg-opacity-50 z-50'>
            <LoadingSpinner width="100" height="100" />
            <p className='text-white absolute inset-[45v]'>{ `${loadPercentage}%` }</p>
          </div>
        )
      }
      {
        displayError.length !== 0 &&
        <p className='text-red-500'>
          {displayError}
        </p>
      }
    </div>
  )
}

Csv.propTypes = {
  dataType: PropTypes.string,
  reloadData: PropTypes.func
}

export default Csv