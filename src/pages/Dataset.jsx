import { useContext } from "react"
import { useQuery } from "react-query"
import TableComponent from "../components/Datasets/Table/TableComponent"
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner"
import UploadCSVComponent from "../components/Datasets/UploadCSV/UploadCSVComponent"

import { CollectionContext } from "../context/collectionContext"
import { UserContext } from "../context/userContext"

import { 
  getOwnOrganizationCollections, 
  getDemoCollection
} from "../services/collectionService"
import { getOwnProfile } from "../services/userService"

function Dataset() {
  const { collection, setCollection } = useContext(CollectionContext)
  const { user, setUser } = useContext(UserContext)

  useQuery('profile', getOwnProfile, {
    enabled: !!user && !user.name,
    onSuccess: (data) => {
      if (data && data.result) {
        setUser(data.result)
      }
    }
  })

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

  useQuery('demoCollection', getDemoCollection, {
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
  console.log(collection)
  return (
    <>
      {
        Object.keys(collection).length === 0 ?
          <LoadingSpinner /> :
          <div className='overflow-x-auto'>
            {user?.role === 'wizard' ? < UploadCSVComponent /> : '' }
            <TableComponent data={collection.data} />
          </div>
      }
    </>
  )
}

export default Dataset