import { useContext } from "react"
import { useQuery } from "react-query"
import { Button } from "@/components/ui/button"

import { CollectionContext } from "../context/collection"
import { getPublicCollections } from "../services/collectionService"

import { I18N } from "../i18n"
import MapComponent from "../components/MapComponent/MapComponent"
import Header from "../components/Header/Header"

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
    console.log(collection)
  }

  return (
    <>
      <MapComponent/>
    </>
  )
}

export default Home