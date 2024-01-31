import { useContext } from "react"
import { useQuery } from "react-query"
import { Button } from "@/components/ui/button"

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
    console.log(collection)
  }

  return (
    <>
      <MapComponent/>
      {/* <div>
        { example }
      </div>
      <div>
        <Button 
          onClick={()=> console.log('click')}
        >
          Default Button
        </Button>
        <Button 
          variant="outline"
          onClick={()=> console.log('click')}
        >
          Outline Button
        </Button>
        <Button 
          variant="destructive"
          size="lg"
          onClick={()=> console.log('click')}
        >
          Destructive Large Button
        </Button>
        <Button 
          variant="ghost"
          onClick={()=> console.log('click')}
        >
          Ghost Button
        </Button>
      </div> */}
    </>
  )
}

export default Home