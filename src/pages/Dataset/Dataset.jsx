import { useContext } from "react"
import { useQuery } from "react-query"
// import TableComponent from "../../components/Datasets/Table/TableComponent"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import UploadCSVComponent from "../../components/Datasets/UploadCSV/UploadCSVComponent"

import { CollectionContext } from "../../context/collectionContext"
import { UserContext } from "../../context/userContext"

import { getPublicCollections } from "../../services/collectionService"
import { getOwnProfile } from "../../services/userService"

function Dataset() {
  const { collection, setCollection } = useContext(CollectionContext)
  const { user, setUser } = useContext(UserContext)

  useQuery('profile', getOwnProfile, {
    enabled: !!user.name,
    onSuccess: (data) => {
      if (data && data.result) {
        setUser(data.result)
      }
    }
  })

  useQuery('getCollection', getPublicCollections, {
    enabled: collection.length === 0 && user.name,
    onSuccess: (data) => {
      if (data && data.result) {
        setCollection(data.result)
      }
    }
  })

  return (
    <>
      {
        collection.length === 0 ?
          <LoadingSpinner /> :
          <div className='overflow-x-auto'>
            <UploadCSVComponent />
            {/* <TableComponent data={collection[0].data} /> */}
          </div>
      }
    </>
  )
}

export default Dataset