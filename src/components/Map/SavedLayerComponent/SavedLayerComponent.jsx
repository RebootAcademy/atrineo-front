/* eslint-disable no-unused-vars */
import { useContext } from 'react'
import { LayerContext } from '../../../context/layerContext'
import { Card } from '../../ui/Card/Card'
import { EyeIcon, EyeOffIcon, TrashIcon } from '../../ui/Icons/Icons'

function SavedLayerComponent () {
  const { layers, clearLayerById, toggleLayerVisibility } = useContext(LayerContext)

  return (
    <>
      {layers.map((layer, index) => (
        <Card
          key={layer.id}
          className='relative top-20 z-[9999999999] w-60 flex justify-between items-center p-2'
          style={{ top: `${20 + index * 6}px` }}
        >
          <p className="font-bold text-lg">Layer {layer.id}</p>

          <div className='flex gap-1'>
            <button onClick={() => toggleLayerVisibility(layer.id)}>
              {layer.isVisible ? <EyeOffIcon /> : <EyeIcon />}
            </button>

            <button onClick={() => clearLayerById(layer.id)}>
              <TrashIcon />
            </button>

          </div>

        </Card>
      ))}
    </>
  )
}

export default SavedLayerComponent
