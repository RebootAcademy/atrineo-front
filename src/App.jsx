/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { router } from './router'
import { RouterProvider } from 'react-router-dom'

import { LayerContext } from './context/layerContext'
import { CollectionContext } from './context/collectionContext'
import { polygon } from '@turf/turf'

const queryClient = new QueryClient()

function App() {
  const [mapDivision, setMapDivision] = useState('division3')
  const [mapCenter, setMapCenter] = useState([48.6, 9])
  const [collection, setCollection] = useState([])
  const [searchPolygon, setSearchPolygon] = useState(null)
  const [selectedRegion, setSelectedRegion] = useState('')
  const [layers, setLayers] = useState([])
  const [nextLayerId, setNextLayerId] = useState(1)
  const storage = window.localStorage
  const collectionValue = { collection, setCollection }
  const [selectedNameDistrict, setSelectedNameDistrict] = useState([])

  useEffect(() => {
    storage.clear()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {

  }, [searchPolygon])

  const saveCurrentLayer = (obj) => {
    // Intentar cargar el arreglo de capas existente desde localStorage, o iniciar uno nuevo si no existe
    const existingLayers = JSON.parse(storage.getItem('layers')) || []

    // Añadir la nueva capa al arreglo de capas existente
    const updatedLayers = [...existingLayers, {
      id: nextLayerId,
      isVisible: true,
      data: obj
    }]

    // Guardar el arreglo actualizado de capas en localStorage
    storage.setItem('layers', JSON.stringify(updatedLayers))
    console.log(`Layer ${nextLayerId} saved to localStorage with previous layers`, storage)

    // Actualizar el estado de layers y nextLayerId
    setLayers(updatedLayers)

    setNextLayerId(prevId => prevId + 1)
  }

  const clearLayerById = (layerId) => {
    // Cargar el arreglo de capas existente desde localStorage
    const existingLayers = JSON.parse(storage.getItem('layers')) || []
    // Filtrar el arreglo para eliminar la capa con el id especificado
    const updatedLayers = existingLayers.filter(layer => layer.id !== layerId)
    // Guardar el arreglo actualizado de capas en localStorage
    storage.setItem('layers', JSON.stringify(updatedLayers))
    // Actualizar el estado de layers con el nuevo arreglo de capas
    setLayers(updatedLayers)
    setNextLayerId(nextLayerId - 1)

    console.log('Layer deleted')
    console.log(storage)
  }

  const toggleLayerVisibility = (layerId) => {
    const existingLayers = JSON.parse(storage.getItem('layers')) || []
    const updatedLayers = existingLayers.map(layer => {
      if (layer.id === layerId) {
        return { ...layer, isVisible: !layer.isVisible }
      }
      return layer
    })
    storage.setItem('layers', JSON.stringify(updatedLayers))
    setLayers(updatedLayers)
    console.log(`Layer ${layerId} visibility toggled`)
  }

  const value = {
    searchPolygon,
    setSearchPolygon,
    selectedRegion,
    setSelectedRegion,
    saveCurrentLayer,
    clearLayerById,
    mapDivision,
    setMapDivision,
    nextLayerId,
    layers,
    setLayers,
    toggleLayerVisibility,
    selectedNameDistrict,
    setSelectedNameDistrict,
    mapCenter,
    setMapCenter
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <LayerContext.Provider value={value}>
          <CollectionContext.Provider value={collectionValue}>
            <RouterProvider router={router} />
          </CollectionContext.Provider>
        </LayerContext.Provider>
      </QueryClientProvider>
    </>
  )
}

export default App
