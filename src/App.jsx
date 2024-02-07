import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RouterProvider } from 'react-router-dom'

import { router } from './router'

import { CollectionContext } from './context/collection'
import { LayerContext } from './context/layerContext'

const queryClient = new QueryClient()

function App() {
  const [collection, setCollection] = useState([])
  const [showMarkers, setShowMarkers] = useState({})
  const [showPatents, setShowPatents] = useState({})
  const [showPopulation, setShowPopulation] = useState({})

  const collectionValue = { collection, setCollection }

  const toggleMarkersDisplay = (layerId) => {
    setShowMarkers(prevState => ({
      ...prevState,
      [layerId]: !prevState[layerId]
    }))
  }

  const togglePatentsDisplay = (layerId) => {
    setShowPatents(prevState => ({
      ...prevState,
      [layerId]: !prevState[layerId]
    }))
  }

  const togglePopulationDisplay = () => {
    setShowPopulation((prev) => !prev)
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <LayerContext.Provider value={{ 
          showMarkers, 
          toggleMarkersDisplay, 
          showPatents, 
          setShowPatents, 
          showPopulation, 
          setShowPopulation,
          togglePopulationDisplay }}>
          <CollectionContext.Provider value={collectionValue}>
            <RouterProvider router={router} />
          </CollectionContext.Provider>
        </LayerContext.Provider>
      </QueryClientProvider>
    </>
  )
}

export default App
