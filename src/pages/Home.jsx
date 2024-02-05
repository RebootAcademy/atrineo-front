import { useContext } from "react"
import { useQuery } from "react-query"

import { CollectionContext } from "../context/collection"
import { getPublicCollections } from "../services/collectionService"

import { I18N } from "../i18n"
import MapComponent from "../components/MapComponent/MapComponent"

function Home () {
  const { example } = I18N
  const { collection, setCollection } = useContext(CollectionContext)

  const { 
    isLoading,
    //data,
    //isSuccess
  } = useQuery('public', getPublicCollections, {
    onSuccess: (data) => {
      setCollection(data.result)
    }
  })

  if (!isLoading) {
    // console.log("aqui va collection sin quotes")
  }

  return (
    <>
      <MapComponent/>
    </>
  )
}

export default Home