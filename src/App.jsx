import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RouterProvider } from 'react-router-dom'

import { router } from './router'
import { CollectionContext } from './context/collection'
import { MarkersProvider } from './context/MarkersContext'

const queryClient = new QueryClient()

function App() {
  const [collection, setCollection] = useState([])
  const collectionValue = {collection, setCollection}

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MarkersProvider>
          <CollectionContext.Provider value={collectionValue}>
            <RouterProvider router={router} />
          </CollectionContext.Provider>
        </MarkersProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
