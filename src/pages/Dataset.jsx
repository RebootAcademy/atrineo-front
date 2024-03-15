import { useContext } from "react"

import TableComponent from "../components/Datasets/Table/TableComponent"
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner"
import UploadCSVComponent from "../components/Datasets/UploadCSV/UploadCSVComponent"

import { CollectionContext } from "../context/collectionContext"
import { UserContext } from "../context/userContext"

import { useUser } from "@/hooks/useUser"
import { useCollectionFetch } from "@/hooks/useCollectionFetch"

function Dataset() {
  const { collection, setCollection } = useContext(CollectionContext)
  const { user } = useContext(UserContext)

  // Fetch user profile in case page reload
  useUser()
  // The refetch function is passed as a prop to CSV component, to refetch data once the user has uploaded a new data file
  const { refetch } = useCollectionFetch(
    user, 
    setCollection, 
    collection
  )

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
                reloadData={ refetch }
              /> : '' }
            <TableComponent data={collection.data} />
          </div>
      }
    </>
  )
}

export default Dataset