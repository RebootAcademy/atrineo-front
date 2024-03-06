import CSVReader from 'react-csv-reader'
import { uploadCsv } from '../../services/uploadData'
import TableComponent from '../../components/Datasets/Table/TableComponent'
import { useState } from 'react'

function Csv() {
  // eslint-disable-next-line no-unused-vars
  const [csvData, setCsvData] = useState(null)

  const handleCSVUpload = async (data, fileInfo) => {
    console.log("Data:", data)
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
    <div className='bg-red-400'>
      <CSVReader
        onFileLoaded={handleCSVUpload}
        parserOptions={{ header: true, dynamicTyping: true, skipEmptyLines: true }}
      />
      {csvData && <TableComponent data={csvData} />}
    </div>
  )
}

export default Csv
