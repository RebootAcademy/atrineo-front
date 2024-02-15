import { useContext } from "react"
import { LayerContext } from "../../../context/layerContext"
import CustomButton from "../../CustomButton/CustomButton"
import { Card } from "../../ui/Card/Card"

function SavedLayerComponent() {
  const { clearSavedState } = useContext(LayerContext)

  console.log(localStorage['appState'])

  return (
    <Card className='absolute top-20 right-3 z-[9999999999] w-60 flex justify-between items-center bg-white p-2'>
      <p className="font-bold text-lg">Layer 1</p>
      <CustomButton
        text="Delete"
        fn={clearSavedState}
      />
    </Card>
  )
}

export default SavedLayerComponent