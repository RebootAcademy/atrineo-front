import { useContext } from "react"
import { LayerContext } from "../../../context/layerContext"
import StartupsComponent from "../StartupsComponent/StartupsComponent"

function LayersManager() {
  const { layers, nextLayerId } = useContext(LayerContext)

  console.log(layers)
  console.log(nextLayerId)

  return (
    <>
      {layers.map(layer => {
        if (layer.id === nextLayerId - 1 && layer.isVisible) {
          return <StartupsComponent key={layer.id} data={layer.data} />
        }
      })}
    </>
  )
}

export default LayersManager