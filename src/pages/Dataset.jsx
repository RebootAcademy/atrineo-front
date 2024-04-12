import { useContext, useState, useMemo } from "react"
import { debounce } from "lodash"

import TableComponent from "../components/Datasets/Table/TableComponent"
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner"
import UploadCSVComponent from "../components/Datasets/UploadCSV/UploadCSVComponent"
import ColumnsModal from "@/components/Datasets/ColumnsModal/ColumnsModal"
import { Input } from '@/components/ui/Input/input'

import { CollectionContext } from "../context/collectionContext"
import { UserContext } from "../context/userContext"

import { useUser } from "@/hooks/useUser"
import { useCollectionFetch } from "@/hooks/useCollectionFetch"

function Dataset() {
  const { collection, setCollection } = useContext(CollectionContext)
  const { user } = useContext(UserContext)
  const [hiddenColumns, setHiddenColumns] = useState([])
  const [searchItem, setSearchItem] = useState('')

  const fields = useMemo(() => collection.data && collection.data.length > 0 ? collection.data[0].fields : [], [collection.data])
  const columnNames = useMemo(() => fields.map(f => f.fieldName), [fields])

  // Fetch user profile in case page reload
  useUser()
  // The refetch function is passed as a prop to CSV component, to refetch data once the user has uploaded a new data file
  const { refetch } = useCollectionFetch(
    user, 
    setCollection, 
    collection
  )

  const handleSearchChange = debounce((e) => {
    setSearchItem(e.target.value)
  }, 500)

  return (
    <>
      {
        Object.keys(collection).length === 0 ?
          <LoadingSpinner 
            width="100" 
            height="100" 
          /> :
          <div className='relative h-full'>
            {user?.role === 'wizard' ?
              < UploadCSVComponent
                reloadData={refetch}
              /> : ''}
            <div className='flex m-2 relative my-8 mx-4'>
              <Input 
                className='w-2/4 border-black mr-4' 
                onChange={handleSearchChange}
                placeholder={'Search...'}
              />
              <ColumnsModal 
                columnNames={columnNames} 
                hiddenColumns={hiddenColumns} 
                setHiddenColumns={setHiddenColumns} 
              />
            </div>
            <TableComponent 
              data={collection.data} 
              hiddenColumns={hiddenColumns}
              searchItem={searchItem}
            />
          </div>
      }
    </>
  )
}

export default Dataset