import { useContext } from "react"

import TableComponent from "../components/Datasets/Table/TableComponent"

import { CollectionContext } from "../context/collectionContext"

function Dataset() {
  const { collection } = useContext(CollectionContext)
  
  return (
    <div className='overflow-x-auto'>
      <TableComponent data={collection[0].data} />
    </div>
  )
}

export default Dataset