import { CollectionContext } from "../../context/collection"
import { useContext } from "react"

export const FilterData = () => {
    const { collection } = useContext(CollectionContext)
    console.log(collection)

    const result = collection.flatMap((item) =>
        item.data.map((dataItem) => (
            console.log(dataItem)
        ))
    )
        return result
}
