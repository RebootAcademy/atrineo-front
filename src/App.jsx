import { useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RouterProvider } from 'react-router-dom'

import { router } from './router'

import { CollectionContext } from './context/collection'
import { LayerContext } from './context/layerContext'

const queryClient = new QueryClient()

function App() {
  const [collection, setCollection] = useState([])
  const [showMarkers, setShowMarkers] = useState({ startups: false })
  const [showPatents, setShowPatents] = useState({ patents: false })
  const [patentsFilter, setPatentsFilter] = useState(0)

  const [financingAccess, setFinancingAccess] = useState(false)

  const collectionValue = {collection, setCollection}
  
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

  const toggleFinancingAccess = (value) => {
    setFinancingAccess(value)
  }

  useEffect(() => {
    // Verifica si al menos un objeto en `data` tiene `financingAccess` en true
    const financingAccessEnabled = collection.some(item =>
      item.data.some(dataItem => dataItem.financingAccess)
    );
    setFinancingAccess(financingAccessEnabled);
  }, [collection])

  console.log(collection)
  console.log(financingAccess)
  
  const value = {
    showMarkers,
    setShowMarkers,
    showPatents,
    setShowPatents,
    patentsFilter,
    setPatentsFilter,
    toggleMarkersDisplay,
    togglePatentsDisplay,
    financingAccess,
    setFinancingAccess,
    toggleFinancingAccess // Asegúrate de incluir la función para actualizar el filtro
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
