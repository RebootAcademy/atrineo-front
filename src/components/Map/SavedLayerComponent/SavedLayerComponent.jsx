/* eslint-disable no-unused-vars */
import { useContext } from 'react'
import { LayerContext } from '../../../context/layerContext'
import { Card } from '../../ui/Card/Card'
import { EyeIcon, EyeOffIcon, TrashIcon } from '../../ui/Icons/Icons'

function SavedLayerComponent () {
  const { layers, clearLayerById, toggleLayerVisibility } = useContext(LayerContext)

  return (
    <>
      {layers.map((layer) => (
        <Card
          key={layer.id}
          className='relative z-[9999999999] w-48 flex justify-between items-center p-2 mb-2'
        >
          <p className="font-bold text-base">Layer {layer.id}</p>
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
