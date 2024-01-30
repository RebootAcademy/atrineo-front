import { useState, useContext } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RouterProvider } from 'react-router-dom'

import { router } from './router'
import { CollectionContext } from './context/collection'

const queryClient = new QueryClient()

import './App.css'

function App() {
  const [ collection, setCollection ] = useState([])

  const collectionValue = {collection, setCollection}
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CollectionContext.Provider value={collectionValue}>
          <RouterProvider router={router} />
        </CollectionContext.Provider>
      </QueryClientProvider>
    </>
  )
}

export default App
