/* eslint-disable no-unused-vars */
import { useContext } from 'react'
import { useQuery } from 'react-query'

import { CollectionContext } from '../context/collectionContext'
import { getPublicCollections } from '../services/collectionService'

import { I18N } from '../i18n'
import MapComponent from '../components/Map/MapComponent/MapComponent'

function Home () {
  const { example } = I18N
  const { collection, setCollection } = useContext(CollectionContext)

  const {
    isLoading
    // data,
    // isSuccess
  } = useQuery('public', getPublicCollections, {
    onSuccess: (data) => {
      if (data && data.result) {
        setCollection(data.result)
      }
    }
  })

  /*   if (!isLoading) {
    console.log(collection)
  } */

  return (
    <>
      <MapComponent/>
    </>
  )
}

export default Home
