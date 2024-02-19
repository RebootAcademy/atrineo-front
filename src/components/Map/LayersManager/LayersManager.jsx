import { useContext } from "react"
import { LayerContext } from "../../../context/layerContext"
import StartupsComponent from "../StartupsComponent/StartupsComponent"

function LayersManager() {
  const { layers } = useContext(LayerContext)

  console.log(layers)

  return (
    <>
      {layers.map(layer => {
        if (layer.id === 1 && layer.isVisible) {
          return <StartupsComponent />
        }
      })}
    </>
  )
}

export default LayersManager