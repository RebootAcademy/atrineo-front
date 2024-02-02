import { CollectionContext } from "../../context/collection"
import { useContext } from "react"

export const FilterData = ({attribute}) => {
    const { collection } = useContext(CollectionContext)
    //console.log(collection)

    const result = collection.map((item) =>
        item.data.map((dataItem) => dataItem[attribute])
        )
    

    console.log(result)
    return result
}

