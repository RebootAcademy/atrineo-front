/* eslint-disable no-unused-vars */
import { useContext } from 'react'

import { UserContext } from '../context/userContext'
import { CollectionContext } from '../context/collectionContext'

import { I18N } from '../i18n'
import MapComponent from '../components/Map/MapComponent/MapComponent'
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner'

import { useUser } from '@/hooks/useUser'
import { useCollectionFetch } from '@/hooks/useCollectionFetch'

function Home () {
  const { example } = I18N
  const { collection, setCollection } = useContext(CollectionContext)
  const { user } = useContext(UserContext)

  useUser()
  useCollectionFetch(
    user,
    setCollection,
    collection
  )

  return (
    <>
      {
        Object.keys(collection).length === 0 ?
          <LoadingSpinner width="100" height="100" /> :
          <MapComponent />
      }
    </>
  )
}

export default Home
