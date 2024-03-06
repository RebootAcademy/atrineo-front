import { useContext } from 'react'
import { LayerContext } from '../../../context/layerContext'
import { Card } from '../../ui/Card/Card'
import { EyeIcon, EyeOffIcon, TrashIcon } from '../../ui/Icons/Icons'
import CircleLegend from '../../ui/Legend/CircleLegend'
import PatternLegend from '../../ui/Legend/PatternLegend'

function SavedLayerComponent() {
  const { layers, clearLayerById, toggleLayerVisibility, colorIndex } = useContext(LayerContext)

  return (
    <>
      {layers.map((layer) => {
        return (
          <Card
            key={layer.id}
            className='relative z-[9999999999] w-full flex flex-col justify-between items-center p-2 ml-1 mb-2 border-0'
          >
            <div>
              <div className='w-[240px] flex justify-between mb-1'>
                <p className="font-bold text-sm">Filter Layer {layer.id}</p>
                <div className='flex flex-cols gap-1'>
                  <button onClick={() => toggleLayerVisibility(layer.id)}>
                    {layer.isVisible ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                  <button onClick={() => clearLayerById(layer.id)}>
                    <TrashIcon />
                  </button>
                </div>
              </div>
              <hr />

              <div className='text-sm mt-1'>
                {layer.data.type === 'startups' ? (
                  <>
                    {Object.entries(layer.data).map(([key, value]) => {
                      // Filtramos para no mostrar el tipo, ya que ya sabemos que es 'startups'
                      if (key !== 'type') {
                        return (
                          <div key={key} className='flex justify-between'>
                            <p>{key}: </p>
                            <p>{value}</p>
                          </div>
                        )
                      }
                      return null
                    })}
                    <div className='mb-4'>
                      <CircleLegend />
                    </div>
                  </>
                ) : (
                  <>
                    {Object.entries(layer.data).map(([key, value]) => {
                      if (key !== 'type' && key !== 'fieldName') {
                        return <p key={key}>{`${value}`} by Regions</p>
                      }
                      return null
                    })}
                    <div className='mb-4 mt-6'>
                      <PatternLegend colorIndex={colorIndex} />
                    </div>
                  </>
                )}

              </div>
            </div>
          </Card>
        )
      })}
    </>
  )
}

export default SavedLayerComponent
