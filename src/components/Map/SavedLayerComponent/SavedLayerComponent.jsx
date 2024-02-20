/* eslint-disable no-unused-vars */
import { useContext } from 'react'
import { LayerContext } from '../../../context/layerContext'
import { Card } from '../../ui/Card/Card'
import CustomButton from '../../CustomButton/CustomButton'

function SavedLayerComponent () {
  const { clearLayerById, layers } = useContext(LayerContext)

  return (
    <>
      {layers.map((layer, index) => (
        <Card
          key={layer.id}
          className='absolute top-20 right-3 z-[9999999999] w-60 flex justify-between items-center bg-white p-2'
          style={{ top: `${20 + index * 60}px` }}
        >
          <p className="font-bold text-lg">Layer {layer.id}</p>
          <CustomButton
            text="Delete"
            fn={() => clearLayerById(layer.id)}
          />
        </Card>
      ))}
    </>
  )
}

export default SavedLayerComponent
