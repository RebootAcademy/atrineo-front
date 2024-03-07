/* eslint-disable no-unused-vars */
import { useContext } from 'react'
import { useQuery } from 'react-query'

import { UserContext } from '../context/userContext'
import { CollectionContext } from '../context/collectionContext'

import { 
  getOwnOrganizationCollections, 
  getPublicCollections 
} from '../services/collectionService'
import { getOwnProfile } from '../services/userService'

import { I18N } from '../i18n'
import MapComponent from '../components/Map/MapComponent/MapComponent'
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner'

function Home () {
  const { example } = I18N
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
    enabled: !!user && Object.keys(user).length > 0 && collection.length === 0 && user.role && user.role !== 'wizard',
    onSuccess: (data) => {
      if (data && data[0]) {
        setCollection(data)
      }
    }
  })

  useQuery('publicCollections', getPublicCollections, {
    enabled: !!user && Object.keys(user).length > 0 && collection.length === 0 && user.role === 'wizard',
    onSuccess: (data) => {
      if (Object.keys(user).length > 0) {
        setCollection(data.result)
      }
    }
  })

  // const {
  //   isLoading,
  //   // data,
  //   // isSuccess
  // } = useQuery('organizationCollections', getOwnOrganizationCollections, {
  //   enabled: collection.length === 0 && !!user.name,
  //   onSuccess: (data) => {
  //     if (data && data[0]) {
  //       setCollection(data)
  //     }
  //   }
  // })

  return (
    <>
      {
        collection.length === 0 ?
          <LoadingSpinner /> :
          <MapComponent />
      }
    </>
  )
}

export default Home
