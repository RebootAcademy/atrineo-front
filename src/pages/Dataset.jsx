import { useContext, useState } from "react"
import { useQuery } from "react-query"

import TableComponent from "../components/Datasets/Table/TableComponent"
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner"
import UploadCSVComponent from "../components/Datasets/UploadCSV/UploadCSVComponent"
import ColumnsModal from "@/components/Datasets/ColumnsModal/ColumnsModal"

import { CollectionContext } from "../context/collectionContext"
import { UserContext } from "../context/userContext"

import {
  getOwnOrganizationCollections,
  getDemoCollection
} from "../services/collectionService"

import { useUser } from "@/hooks/useUser"

function Dataset() {
  const { collection, setCollection } = useContext(CollectionContext)
  const { user } = useContext(UserContext)
  const [hiddenColumns, setHiddenColumns] = useState([])

  const fields = collection.data && collection.data.length > 0 ? collection.data[0].fields : []
  const columnNames = fields.map(f => f.fieldName)

  useUser()
  console.log({ hiddenColumns })

  useQuery('organizationCollections', getOwnOrganizationCollections, {
    enabled: !!user &&
      Object.keys(user).length > 0
      && Object.keys(collection).length === 0 &&
      user.role &&
      user.role !== 'wizard',
    onSuccess: (data) => {
      if (data) {
        setCollection(data[0])
      }
    }
  })

  const { refetch } = useQuery('demoCollection', getDemoCollection, {
    enabled: !!user &&
      Object.keys(user).length > 0 &&
      Object.keys(collection).length === 0 &&
      user.role === 'wizard',
    onSuccess: (data) => {
      if (Object.keys(user).length > 0) {
        setCollection(data)
      }
    }
  })

  return (
    <>
      <div className="relative">
        <div className="fixed w-24 md:w-24 top-24 right-0 mr-4 z-50">
          <ColumnsModal columnNames={columnNames} hiddenColumns={hiddenColumns} setHiddenColumns={setHiddenColumns} />
        </div>
      </div>
      {
        Object.keys(collection).length === 0 ?
          <LoadingSpinner width="100" height="100" /> :
          <div className='relative h-full'>
            {user?.role === 'wizard' ?
              < UploadCSVComponent
                reloadData={refetch}
              /> : ''}
            <TableComponent data={collection.data} hiddenColumns={hiddenColumns} />
          </div>
      }
    </>
  )
}

export default Dataset