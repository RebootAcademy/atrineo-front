import { CollectionContext } from "../../context/collection"
import { useContext } from "react"
import { getPublicCollections } from "../../services/collectionService"

export const FilterData = ({ attribute }) => {
    const { collection } = useContext(CollectionContext)
    console.log(collection)

    const districtNames = collection && collection[0]?.data 
    ? collection[0].data.map(item => ({districtName: item.districtName}))
    : []
    console.log(districtNames)
}

