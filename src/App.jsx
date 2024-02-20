/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { router } from './router'
import { RouterProvider } from 'react-router-dom'

import { LayerContext } from './context/layerContext'
import { CollectionContext } from './context/collection'

import { CalculatePopulationBounds, CalculateResearchInvestmentBounds } from './helpers'

const queryClient = new QueryClient()

function App () {
  const [mapDivision, setMapDivision] = useState('division3')

  const [collection, setCollection] = useState([])

  const [patentsFilter, setPatentsFilter] = useState([0, 100])
  const [populationFilter, setPopulationFilter] = useState([0])
  const [populationBounds, setPopulationBounds] = useState({ minPopulation: 0, maxPopulation: 0 })

  const [researchInvestmentFilter, setResearchInvestmentFilter] = useState([0])
  const [researchInvestmentBounds, setResearchInvestmentBounds] = useState({ minResearchInvestment: 0, maxResearchInvestment: 0 })

  const [isFinancingFilterActive, setIsFinancingFilterActive] = useState(false)
  const [isGovFundsReceivedActive, setIsGovFundsReceivedActive] = useState(false)
  const [searchPolygon, setSearchPolygon] = useState(null)
  const [lifeQuality, setLifeQuality] = useState(null)
  const [gnp, setGnp] = useState(0)
  const [companies, setCompanies] = useState([])
  const [selectedRegion, setSelectedRegion] = useState('')

  const [layers, setLayers] = useState([])
  const [nextLayerId, setNextLayerId] = useState(1)

  const collectionValue = { collection, setCollection }

  const storage = window.localStorage

  useEffect(() => {
    storage.clear()
  }, [])

  useEffect(() => {
    if (collection.length > 0) {
      const { minPopulation, maxPopulation } = CalculatePopulationBounds(collection)
      setPopulationBounds({ minPopulation, maxPopulation })
    }
  }, [collection])

  useEffect(() => {
    if (collection.length > 0) {
      const { minResearchInvestment, maxResearchInvestment } = CalculateResearchInvestmentBounds(collection)
      setResearchInvestmentBounds({ minResearchInvestment, maxResearchInvestment })
    }
  }, [collection])

  const toggleFinancingAccess = (value) => {
    setIsFinancingFilterActive(value)
  }

  const toggleGovFundsReceived = (value) => {
    setIsGovFundsReceivedActive(value)
  }

  const saveCurrentLayer = () => {
    const newLayer = {
      patentsFilter,
      populationFilter,
      researchInvestmentFilter,
      isFinancingFilterActive,
      isGovFundsReceivedActive,
      searchPolygon,
      lifeQuality,
      gnp
    }

    // Guardar solo la nueva layer en localStorage bajo una clave única
    storage.setItem(`layer ${nextLayerId}`, JSON.stringify(newLayer))
    console.log(`Layer ${nextLayerId} saved to localStorage`)

    // Actualizar el estado de layers y nextLayerId
    setLayers(prevLayers => [...prevLayers,
      {
        id: nextLayerId,
        isVisible: true,
        data: newLayer
      }])

    setNextLayerId(prevId => prevId + 1)
    resetFilters()
  }

  const resetFilters = () => {
    setTimeout(() => {
      setPatentsFilter([0, 100])
      setPopulationFilter([0])
      setResearchInvestmentFilter([0])
      setIsFinancingFilterActive(false)
      setIsGovFundsReceivedActive(false)
      setSearchPolygon(null)
      setLifeQuality(null)
      setGnp(0)
      // setPopulationBounds({ minPopulation: 0, maxPopulation: 0 })
      // setResearchInvestmentBounds({ minResearchInvestment: 0, maxResearchInvestment: 0 })
    }, 1500)
  }

  const clearLayerById = (layerId) => {
    storage.removeItem(`layer ${layerId}`)
    setLayers(prevLayers => prevLayers.filter(layer => layer.id !== layerId))
    setNextLayerId(nextLayerId - 1)

    console.log('Layer deleted')
    console.log(storage)
  }

  const value = {
    patentsFilter,
    setPatentsFilter,
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
    saveCurrentLayer,
    clearLayerById,
    mapDivision,
    setMapDivision,
    nextLayerId,
    layers
  }

  console.log(populationFilter)

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
