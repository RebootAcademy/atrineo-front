import { useContext } from "react"
import { useQuery } from "react-query"
import TableComponent from "../components/Datasets/Table/TableComponent"
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner"
import UploadCSVComponent from "../components/Datasets/UploadCSV/UploadCSVComponent"

import { CollectionContext } from "../context/collectionContext"
import { UserContext } from "../context/userContext"

import { getOwnProfile } from "../services/userService"
import {
  getOwnOrganizationCollections,
  getPublicCollections
} from "../services/collectionService"

function Dataset() {
  const { collection, setCollection } = useContext(CollectionContext)
  const { user, setUser } = useContext(UserContext)

  const { isLoading: isLoadingProfile } = useQuery('profile', getOwnProfile, {
    enabled: !!user && !user.name,
    onSuccess: (data) => {
      if (data && data.result) {
        setUser(data.result)
      }
    }
  })

  const { isLoading: isLoadingOrgCollections } = useQuery('organizationCollections', getOwnOrganizationCollections, {
    enabled: !!user &&
      Object.keys(user).length > 0
      && collection.length === 0 &&
      user.role &&
      user.role !== 'wizard',
    onSuccess: (data) => {
      if (data && data[0]) {
        setCollection(data)
      }
    }
  })

  const { isLoading: isLoadingPublicCollections } = useQuery('publicCollections', getPublicCollections, {
    enabled: !!user &&
      Object.keys(user).length > 0 &&
      collection.length === 0 &&
      user.role === 'wizard',
    onSuccess: (data) => {
      if (Object.keys(user).length > 0) {
        setCollection(data.result)
      }
    }
  })

  const isLoading = isLoadingProfile || isLoadingOrgCollections || isLoadingPublicCollections

  return (
    <>
      {
        isLoading ?
          <LoadingSpinner /> :
          <div className='overflow-x-auto'>
            {user?.role === 'wizard' && <UploadCSVComponent />}
            <TableComponent data={collection[0].data} />
          </div>
      }
    </>
  )
}

export default Dataset