import { useContext } from 'react'
import { LayerContext } from '../../../context/layerContext'
import { ColorRectangleIcon, EyeIcon, EyeOffIcon, TrashIcon } from '../../ui/Icons/Icons'
import CircleLegend from '../../ui/Legend/CircleLegend'
import PatternLegend from '../../ui/Legend/PatternLegend'

function SavedLayerComponent() {
  const { layers, clearLayerById, toggleLayerVisibility, mapDivision } = useContext(LayerContext)
  return (
    <>
      {layers.map((layer) => {
        return (
          <div key={layer.id} className='relative w-[288px] flex flex-col justify-between p-2 ml-3 mb-2 border-0'>
            <div className='mr-4'>
              <div className='w-full flex justify-between mb-1 border-b-2'>
                <p className="font-bold text-sm mb-1">Filter Layer {layer.id}</p>
                <div className='flex flex-cols gap-1'>
                  <button onClick={() => toggleLayerVisibility(layer.id)}>
                    {layer.isVisible ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                  <button onClick={() => clearLayerById(layer.id)}>
                    <TrashIcon />
                  </button>
                </div>
              </div>
               
              <div className='text-sm mt-1'>
                {layer.data.type === 'startups' ? (
                  <>
                    {
                      Object.entries(layer.data)
                        .filter(([key, ]) => key !== 'type')
                        .map(([key, value]) => (
                          <div key={key} className='flex justify-between'>
                            <div className='flex mt-1'>
                              <ColorRectangleIcon color={value.color} />
                              <p className='ml-2'>{key}: </p>
                            </div>
                            <p>{value.value}</p>
                          </div>
                        ))
                    }
                    <div className='mb-4'>
                      <CircleLegend />
                    </div>
                  </>
                ) : (
                  <>
                    {Object.entries(layer.data).map(([key, value]) => {
                      if (key !== 'type' && key !== 'color') {
                        return <p key={key}>Total {`${value}`} per {mapDivision}</p>
                      }
                    })}
                    <div className='mb-4 mt-4'>
                      <PatternLegend layer={layer} />
                    </div>
                  </>
                )}

              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default SavedLayerComponent
