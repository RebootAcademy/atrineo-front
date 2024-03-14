import CSVReader from 'react-csv-reader'
import { uploadCsv } from '../../../services/uploadData'
import { useRef, useState } from 'react'
import { Button } from '@/components/ui/Button/Button'

function Csv() {
  const [fileName, setFileName] = useState('')
  const fileInputRef = useRef(null)
 
  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  const handleCSVUpload = async (data, fileInfo) => {
    console.log("Data:", data)
    setFileName(fileInfo.name)
    await uploadDataFile(data)
    console.log("File Information:", fileInfo)
  }

  const uploadDataFile = async (data) => {
    try {
      const res = await uploadCsv(data)
      if (res) {
        console.log(res)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='flex justify-between'>
      <div className='flex mr-2 border rounded-md'>
        <button onClick={handleButtonClick} className='rounded-l-md bg-primary text-white px-4 text-sm font-semibold'>Search File</button>
        <div className='w-[600px] rounded-r-md flex items-center pl-3 text-sm'>
          {fileName ? fileName : "File not found"}
        </div>
      </div>
      <Button onClick={uploadDataFile} className='font-semibold'>Update</Button>
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