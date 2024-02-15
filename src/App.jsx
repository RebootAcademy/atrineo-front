import { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RouterProvider } from 'react-router-dom'
import { CollectionContext } from './context/collection'
import { LayerContext } from './context/layerContext'
import { router } from './router'

import { CalculatePopulationBounds, CalculateResearchInvestmentBounds } from './helpers'
import { useDistrictsCoords } from './hooks/useDistrictCoords'

const queryClient = new QueryClient()

function App() {
  const data = useDistrictsCoords({}) || []

  const [collection, setCollection] = useState([])
  const [showMarkers, setShowMarkers] = useState({ startups: false })

  const [patentsFilter, setPatentsFilter] = useState([0, 100])

  const [populationFilter, setPopulationFilter] = useState([0])
  const [populationBounds, setPopulationBounds] = useState({ minPopulation: 0, maxPopulation: 0 })

<<<<<<< HEAD
  const [researchInvestmentFilter, setResearchInvestmentFilter] = useState([0])
  const [researchInvestmentBounds, setResearchInvestmentBounds] = useState({ minResearchInvestment: 0, maxResearchInvestment: 0 })

=======
>>>>>>> 93a6e4aef7d4e25010b0c396165b963e46c30369
  const [isFinancingFilterActive, setIsFinancingFilterActive] = useState(false)
  const [isGovFundsReceivedActive, setIsGovFundsReceivedActive] = useState(false)
  const [searchPolygon, setSearchPolygon] = useState(null)
  const collectionValue = {collection, setCollection}
  const [lifeQuality, setLifeQuality] = useState(null)
  const [gnp, setGnp] = useState(0)
<<<<<<< HEAD
=======
  // const [showPopulation, setShowPopulation] = useState({})
>>>>>>> 93a6e4aef7d4e25010b0c396165b963e46c30369

  useEffect(() => {
    if (data.length > 0) {
      const { minPopulation, maxPopulation } = CalculatePopulationBounds(data)
      setPopulationBounds({ minPopulation, maxPopulation })
    }
  }, [data])
<<<<<<< HEAD
  
  useEffect(() => {
    if (collection.length > 0) {
      const { minResearchInvestment, maxResearchInvestment } = CalculateResearchInvestmentBounds(collection)
      setResearchInvestmentBounds({ minResearchInvestment, maxResearchInvestment })
    }
  }, [collection])
=======
>>>>>>> 93a6e4aef7d4e25010b0c396165b963e46c30369
  
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
    patentsFilter,
    setPatentsFilter,
    toggleMarkersDisplay,
    togglePatentsDisplay,
    isFinancingFilterActive,
    setIsFinancingFilterActive,
    toggleFinancingAccess,
    isGovFundsReceivedActive,
    toggleGovFundsReceived, 
<<<<<<< HEAD
=======
    // showPopulation, 
    // setShowPopulation,
>>>>>>> 93a6e4aef7d4e25010b0c396165b963e46c30369
    searchPolygon,
    setSearchPolygon,
    lifeQuality,
    setLifeQuality,
    gnp, 
    setGnp,
<<<<<<< HEAD
    populationFilter,
    setPopulationFilter,
    ...populationBounds,
    researchInvestmentFilter,
    setResearchInvestmentFilter,
    ...researchInvestmentBounds,
=======
    populationFilter, 
    setPopulationFilter,
    ...populationBounds,
>>>>>>> 93a6e4aef7d4e25010b0c396165b963e46c30369
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
