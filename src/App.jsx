/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RouterProvider } from 'react-router-dom'

import { CollectionContext } from './context/collectionContext'
import { LayerContext } from './context/layerContext'
import { UserContext } from './context/userContext'
import { GraphContext } from './context/graphContext'

import { router } from './router'

const queryClient = new QueryClient()

function App() {
  const [mapDivision, setMapDivision] = useState('division3')
  const [selectedNameDistrict, setSelectedNameDistrict] = useState([])
  const [selectedRegion, setSelectedRegion] = useState('')
  const [searchPolygon, setSearchPolygon] = useState(null)
  const [mapCenter, setMapCenter] = useState([48.6, 9])
  const [collection, setCollection] = useState({})
  const [layers, setLayers] = useState([])
  const [ user, setUser ] = useState({})
  
  const [colorIndex, setColorIndex] = useState(0)

  const [graphs, setGraphs] = useState([])
    
  const storage = window.localStorage
  
  useEffect(() => {
    storage.removeItem('layers')
    storage.removeItem('graphs')
    setLayers([])
  }, [])
  
  useEffect(() => {
  }, [searchPolygon])
  
  const saveCurrentLayer = (obj) => {
    // Intentar cargar el arreglo de capas existente desde localStorage, o iniciar uno nuevo si no existe
    const existingLayers = JSON.parse(storage.getItem('layers')) || []
    // Determinar el próximo ID basado en el ID más alto existente
    const nextId = existingLayers.reduce((maxId, layer) => Math.max(maxId, layer.id), 0) + 1
    // Añadir la nueva capa al arreglo de capas existente
    const updatedLayers = [...existingLayers, {
      id: nextId,
      isVisible: true,
      data: obj
    }]
    // Guardar el arreglo actualizado de capas en localStorage
    storage.setItem('layers', JSON.stringify(updatedLayers))
    console.log(`Layer ${nextId} saved to localStorage with previous layers`, JSON.parse(storage.getItem('layers')))
    // Actualizar el estado de layers y nextLayerId
    setLayers(updatedLayers)
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
    console.log('Layer deleted')
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

  const saveCurrentGraph = (obj, ownProps) => {
    const existingGraphs = JSON.parse(storage.getItem('graphs')) || []
    const nextId = existingGraphs.reduce((maxId, config) => Math.max(maxId, config.id), 0) + 1

    const newGraph = {
      id: nextId,
      data: {
        ...obj,
        ownProps: ownProps
      }
    }

    const updatedGraphs = [...existingGraphs, newGraph]
    storage.setItem('graphs', JSON.stringify(updatedGraphs))
    console.log(`Graph configuration ${nextId} saved`, JSON.parse(storage.getItem('graphs')))
    setGraphs(updatedGraphs)
  }

  const deleteGraphById = (graphId) => {
    const existingGraphs = JSON.parse(storage.getItem('graphs')) || []
    const updatedGraphs = existingGraphs.filter(graph => graph.id !== graphId)
    storage.setItem('graphs', JSON.stringify(updatedGraphs))
    setGraphs(updatedGraphs)
    console.log('Graph deleted', storage.getItem('graphs'))
  }
  
  const userValue = { 
    user, 
    setUser 
  }

  const collectionValue = { 
    collection, 
    setCollection,
  }

  const graphsValue = {
    graphs,
    saveCurrentGraph,
    deleteGraphById
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
    layers,
    setLayers,
    toggleLayerVisibility,
    selectedNameDistrict,
    setSelectedNameDistrict,
    mapCenter,
    setMapCenter,
    colorIndex,
  }


  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={userValue} >
          <LayerContext.Provider value={value}>
            <GraphContext.Provider value={graphsValue}>
              <CollectionContext.Provider value={collectionValue}>
                <RouterProvider router={router} />
              </CollectionContext.Provider>
            </GraphContext.Provider>
          </LayerContext.Provider>
        </UserContext.Provider>
      </QueryClientProvider>
    </>
  )
}

export default App
