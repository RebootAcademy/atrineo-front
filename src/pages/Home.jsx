import { useContext } from "react"
import { useQuery } from "react-query"

import { CollectionContext } from "../context/collection"
import { getPublicCollections } from "../services/collectionService"

import { I18N } from "../i18n"
import MapComponent from "../components/Map/MapComponent/MapComponent"

function Home() {
  const { example } = I18N
  const { setCollection } = useContext(CollectionContext)

  const { 
    isLoading,
    //data,
    //isSuccess
  } = useQuery('public', getPublicCollections, {
    onSuccess: (data) => {
      if (data && data.result) {
        setCollection(data.result)
      }
    }
  })

  if (isLoading) {
    return 'Loading...'
  }

  return (
    <>
      <MapComponent/>
    </>
  )
}

export default Home