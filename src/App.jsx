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
  const [patentsFilter, setPatentsFilter] = useState([0])

  const [isFinancingFilterActive, setIsFinancingFilterActive] = useState(false)
  const [isGovFundsReceivedActive, setIsGovFundsReceivedActive] = useState(false)

  const [searchPolygon, setSearchPolygon] = useState(null)

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
    setIsFinancingFilterActive(value)
  }

  const toggleGovFundsReceived = (value) => {
    setIsGovFundsReceivedActive(value);
  }
  
  const value = {
    showMarkers,
    setShowMarkers,
    showPatents,
    setShowPatents,
    patentsFilter,
    setPatentsFilter,
    toggleMarkersDisplay,
    togglePatentsDisplay,
    isFinancingFilterActive,
    setIsFinancingFilterActive,
    toggleFinancingAccess,
    isGovFundsReceivedActive,
    toggleGovFundsReceived,
    searchPolygon,
    setSearchPolygon
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
