import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RouterProvider } from 'react-router-dom'

import { router } from './router'

import { CollectionContext } from './context/collection'
import { LayerContext } from './context/layerContext'

const queryClient = new QueryClient()

function App() {
  const [collection, setCollection] = useState([])
  const [showMarkers, setShowMarkers] = useState(false)

  const collectionValue = {collection, setCollection}

  const toggleMarkersDisplay = () => {
    setShowMarkers(!showMarkers)
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <LayerContext.Provider value={{ showMarkers, toggleMarkersDisplay }}>
          <CollectionContext.Provider value={collectionValue}>
            <RouterProvider router={router} />
          </CollectionContext.Provider>
        </LayerContext.Provider>
      </QueryClientProvider>
    </>
  )
}

export default App
