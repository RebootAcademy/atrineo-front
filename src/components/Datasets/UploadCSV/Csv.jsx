import CSVReader from 'react-csv-reader'
import { useRef, useState, useContext } from 'react'
import { useQuery } from 'react-query'

import { uploadCsv } from '../../../services/uploadData'

import { Button } from '@/components/ui/Button/Button'

import { CollectionContext } from '@/context/collectionContext'
import { getPublicCollections } from '@/services/collectionService'

function Csv() {
  const { setCollection } = useContext(CollectionContext)

  const [fileName, setFileName] = useState('')
  const [dataBody,setDataBody] = useState({})
  const [fetchData, setFetchData] = useState(false)

  const fileInputRef = useRef(null)

  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  useQuery('publicCollections', getPublicCollections, {
    enabled: fetchData,
    onSuccess: (data) => {
      setCollection(data.result)
      setFetchData(false)
    }
  })

  const handleCSVUpload = async (data, fileInfo) => {
    console.log("Data:", data)
    setFileName(fileInfo.name)
    setDataBody(data)   
    console.log("File Information:", fileInfo)
  }

  const uploadDataFile = async () => {
    try {
      const res = await uploadCsv(dataBody)
      if (res) {
        setFetchData(true)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='flex justify-center'>
      <div className='flex mr-2 border rounded-md'>
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
    </div>
  )
}

export default Csv
