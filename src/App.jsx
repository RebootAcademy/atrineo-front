/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { router } from './router'
import { RouterProvider } from 'react-router-dom'

import { LayerContext } from './context/layerContext'
import { CollectionContext } from './context/collectionContext'

import { CalculatePopulationBounds, CalculateResearchInvestmentBounds } from './helpers'

const queryClient = new QueryClient()

function App () {
  const [mapDivision, setMapDivision] = useState('division3')
  const [mapCenter, setMapCenter] = useState([48.6, 9])

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

  const storage = window.localStorage
  const collectionValue = { collection, setCollection }

  const [selectedNameDistrict, setSelectedNameDistrict] = useState([])
  const [enableOption, setEnableOption] = useState(false)

  useEffect(() => {
    storage.clear()
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

    // Intentar cargar el arreglo de capas existente desde localStorage, o iniciar uno nuevo si no existe
    const existingLayers = JSON.parse(storage.getItem('layers')) || []

    // Añadir la nueva capa al arreglo de capas existente
    const updatedLayers = [...existingLayers, {
      id: nextLayerId,
      isVisible: true,
      data: newLayer
    }]

    // Guardar el arreglo actualizado de capas en localStorage
    storage.setItem('layers', JSON.stringify(updatedLayers))
    console.log(`Layer ${nextLayerId} saved to localStorage with previous layers`, storage)

    // Actualizar el estado de layers y nextLayerId
    setLayers(updatedLayers)

    setNextLayerId(prevId => prevId + 1)
    resetFilters()
  }

  const resetFilters = () => {
    setPatentsFilter([0, 100])
    setPopulationFilter([0])
    setResearchInvestmentFilter([0])
    setIsFinancingFilterActive(false)
    setIsGovFundsReceivedActive(false)
    setSearchPolygon(null)
    setLifeQuality(null)
    setGnp(0)
  }

  const clearLayerById = (layerId) => {
    // Cargar el arreglo de capas existente desde localStorage
    const existingLayers = JSON.parse(storage.getItem('layers')) || []
    // Filtrar el arreglo para eliminar la capa con el id especificado
    const updatedLayers = existingLayers.filter(layer => layer.id !== layerId)
    // Guardar el arreglo actualizado de capas en localStorage
    storage.setItem('layers', JSON.stringify(updatedLayers))
    // Actualizar el estado de layers con el nuevo arreglo de capas
    setLayers(updatedLayers)
    setNextLayerId(nextLayerId - 1)

    console.log('Layer deleted')
    console.log(storage)
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
    layers,
    setLayers,
    toggleLayerVisibility,
    selectedNameDistrict,
    setSelectedNameDistrict,
    mapCenter,
    setMapCenter,
    enableOption,
    setEnableOption
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
