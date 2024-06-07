/* eslint-disable react-hooks/exhaustive-deps */
 
import { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RouterProvider } from 'react-router-dom'

import { CollectionContext } from './context/collectionContext'
import { LocationContext } from './context/locationContext'
import { LayerContext } from './context/layerContext'
import { UserContext } from './context/userContext'
import { GraphContext } from './context/graphContext'
import { colorPalette } from './helpers/colors'

import { router } from './router'

const queryClient = new QueryClient()

function App() {
  const [mapDivision, setMapDivision] = useState('division3')
  const [selectedNameDistrict, setSelectedNameDistrict] = useState([])
  const [selectedRegion, setSelectedRegion] = useState(null)
  const [searchPolygon, setSearchPolygon] = useState(null)
  const [collection, setCollection] = useState({})
  const [locations, setLocations] = useState({})
  const [layers, setLayers] = useState([])
  const [user, setUser] = useState({})

  const [minValue, setMinValue] = useState(null)
  const [maxValue, setMaxValue] = useState(null)

  const [showStartups, setShowStartups] = useState(true)
  
  const updateMinValue = (newValue) => {
    setMinValue(newValue)
  }

  const updateMaxValue = (newValue) => {
    setMaxValue(newValue)
  }

  const [colorIndex, setColorIndex] = useState(0)
  const [color, setColor] = useState(colorPalette[colorIndex])

  const [graphs, setGraphs] = useState([])

  const storage = window.localStorage

  useEffect(() => {
    storage.removeItem('layers')
    storage.removeItem('graphs')
    setLayers([])
  }, [])

  useEffect(() => {
  }, [searchPolygon])

  const getNextColor = () => {
    const newIndex = (colorIndex + 1) % colorPalette.length
    setColorIndex(newIndex)
    setColor(colorPalette[newIndex])
    return colorPalette[newIndex]
  }

  const saveCurrentLayer = (obj) => {
    const hasActiveFilters = Object.keys(obj).some(key =>
      obj[key] !== null && key !== 'type' && key !== 'id' && key !== 'isVisible'
    )

    if (hasActiveFilters) {
      const existingLayers = JSON.parse(storage.getItem('layers')) || []
      const nextId = existingLayers.reduce((maxId, layer) => Math.max(maxId, layer.id), 0) + 1
      const updatedLayers = [...existingLayers, {
        id: nextId,
        isVisible: true,
        data: obj
      }]
      storage.setItem('layers', JSON.stringify(updatedLayers))
      setLayers(updatedLayers)

      // if (obj.type === 'regions') {
      //   setMapDivision('division3')
      // }
    } else {
      console.log("No active filters found. Layer not saved.")
    }
  }

  const clearLayerById = (layerId) => {
    const existingLayers = JSON.parse(storage.getItem('layers')) || []
    const updatedLayers = existingLayers.filter(layer => layer.id !== layerId)
    storage.setItem('layers', JSON.stringify(updatedLayers))
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

  const locationValue = {
    locations,
    setLocations
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
    color,
    setColor,
    getNextColor,
    minValue,
    maxValue,
    updateMinValue,
    updateMaxValue,
    showStartups,
    setShowStartups
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={userValue} >
          <LayerContext.Provider value={value}>
            <GraphContext.Provider value={graphsValue}>
              <LocationContext.Provider value={locationValue}>
                <CollectionContext.Provider value={collectionValue}>
                  <RouterProvider router={router} />
                </CollectionContext.Provider>
              </LocationContext.Provider>
            </GraphContext.Provider>
          </LayerContext.Provider>
        </UserContext.Provider>
      </QueryClientProvider>
    </>
  )
}

export default App
