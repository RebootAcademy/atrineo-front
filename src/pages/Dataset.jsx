import { useContext } from "react"

import TableComponent from "../components/Datasets/Table/TableComponent"

import { CollectionContext } from "../context/collectionContext"

function Dataset() {
  const { collection } = useContext(CollectionContext)
  return (
    <TableComponent data={collection[0].data} />
  )
}

export default Dataset