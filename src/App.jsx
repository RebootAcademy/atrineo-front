import { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RouterProvider } from 'react-router-dom'
import { CollectionContext } from './context/collectionContext'
import { LayerContext } from './context/layerContext'
import { router } from './router'

import { CalculatePopulationBounds, CalculateResearchInvestmentBounds } from './helpers'
import { useDistrictsCoords } from './hooks/useDistrictCoords'

const queryClient = new QueryClient()

function App() {
  const data = useDistrictsCoords({}) || []
  const [mapDivision, setMapDivision] = useState("division3")
  const [mapCenter, setMapCenter] = useState([48.6, 9])

  const [collection, setCollection] = useState([])
  const [showMarkers, setShowMarkers] = useState({ startups: false })

  const [patentsFilter, setPatentsFilter] = useState([0, 100])

  const [populationFilter, setPopulationFilter] = useState([0])
  const [populationBounds, setPopulationBounds] = useState({ minPopulation: 0, maxPopulation: 0 })

  const [researchInvestmentFilter, setResearchInvestmentFilter] = useState([0])
  const [researchInvestmentBounds, setResearchInvestmentBounds] = useState({ minResearchInvestment: 0, maxResearchInvestment: 0 })

  const [isFinancingFilterActive, setIsFinancingFilterActive] = useState(false)
  const [isGovFundsReceivedActive, setIsGovFundsReceivedActive] = useState(false)
  const [searchPolygon, setSearchPolygon] = useState(null)
  const collectionValue = {collection, setCollection}
  const [lifeQuality, setLifeQuality] = useState(null)
  const [gnp, setGnp] = useState(0)
  const [companies, setCompanies] = useState([])
  const [selectedRegion, setSelectedRegion] = useState("")
  const [selectedNameDistrict, setSelectedNameDistrict] = useState([])

  const [isSavedLayerVisible, setIsSavedLayerVisible] = useState(false)

  useEffect(() => {
    if (data.length > 0) {
      const { minPopulation, maxPopulation } = CalculatePopulationBounds(data)
      setPopulationBounds({ minPopulation, maxPopulation })
    }
  }, [data])
  
  useEffect(() => {
    if (collection.length > 0) {
      const { minResearchInvestment, maxResearchInvestment } = CalculateResearchInvestmentBounds(collection)
      setResearchInvestmentBounds({ minResearchInvestment, maxResearchInvestment })
    }
  }, [collection])
  
  const toggleMarkersDisplay = (layerId) => {
    setShowMarkers(prevState => ({
      ...prevState,
      [layerId]: !prevState[layerId]
    }))
  }
  

  const toggleFinancingAccess = (value) => {
    setIsFinancingFilterActive(value)
  }

  const toggleGovFundsReceived = (value) => {
    setIsGovFundsReceivedActive(value)
  }

  const saveCurrentState = () => {
    const stateToSave = {
      patentsFilter,
      populationFilter,
      populationBounds,
      researchInvestmentFilter,
      researchInvestmentBounds,
      isFinancingFilterActive,
      isGovFundsReceivedActive,
      searchPolygon,
      lifeQuality,
      gnp,
    }
    localStorage.setItem('appState', JSON.stringify(stateToSave))
    console.log('State saved to localStorage')
    setIsSavedLayerVisible(true)
  }

  const clearSavedState = () => {
    localStorage.removeItem('appState')
    
    setPatentsFilter([0, 100])
    setPopulationFilter([0])
    setPopulationBounds({ minPopulation: 0, maxPopulation: 0 })
    setResearchInvestmentFilter([0])
    setResearchInvestmentBounds({ minResearchInvestment: 0, maxResearchInvestment: 0 })
    setIsFinancingFilterActive(false)
    setIsGovFundsReceivedActive(false)
    setSearchPolygon(null)
    setLifeQuality(null)
    setGnp(0)

    setIsSavedLayerVisible(false)

    console.log('State cleared')
  }
  
  const value = {
    showMarkers,
    setShowMarkers,
    patentsFilter,
    setPatentsFilter,
    toggleMarkersDisplay,
    isFinancingFilterActive,
    setIsFinancingFilterActive,
    toggleFinancingAccess,
    isGovFundsReceivedActive,
    toggleGovFundsReceived, 
    searchPolygon,
    setSearchPolygon,
    lifeQuality,
    setLifeQuality,
    gnp, 
    setGnp,
    populationFilter,
    setPopulationFilter,
    ...populationBounds,
    researchInvestmentFilter,
    setResearchInvestmentFilter,
    ...researchInvestmentBounds,
    companies, 
    setCompanies, 
    selectedRegion, 
    setSelectedRegion,
    saveCurrentState,
    clearSavedState,
    isSavedLayerVisible,
    mapDivision,
    setMapDivision,
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
