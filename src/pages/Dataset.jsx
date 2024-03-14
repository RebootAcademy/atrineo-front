import { useContext } from "react"
import { useQuery } from "react-query"
import { useNavigate } from "react-router-dom"

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
  const navigate = useNavigate()
  const { collection, setCollection } = useContext(CollectionContext)
  const { user, setUser } = useContext(UserContext)

  useQuery('profile', getOwnProfile, {
    enabled: !!user && !user.name,
    onSuccess: (data) => {
      if (data && data.result) {
        setUser(data.result)
      }
    },
    onError: () => {
      localStorage.removeItem('token')
      navigate('/')
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
      {
        Object.keys(collection).length === 0 ?
          <LoadingSpinner width="100" height="100" /> :
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