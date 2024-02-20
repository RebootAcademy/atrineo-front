/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from 'react'
import { LayerContext } from '../../../context/layerContext'
import StartupsComponent from '../StartupsComponent/StartupsComponent'
import PatentsLayer from '../PatentsLayer/PatentsLayer'
import LifeQualityLayer from '../LifeQualityLayer/LifeQualityLayer'
import GnpLayer from '../GnpLayer/GnpLayer'
import PopulationLayer from '../PopulationLayer/PopulationLayer'
import ResearchInvestmentLayer from '../ResearchInvestment/ResearchInvestment'

function LayersManager () {
  const { layers, nextLayerId, searchPolygon } = useContext(LayerContext)

  const [filters, setFilters] = useState({
    isFinancingFilterActive: false,
    isGovFundsReceivedActive: false,
    patentsFilter: [0, 100],
    populationFilter: [0],
    researchInvestmentFilter: 0,
    lifeQuality: null,
    gnp: [0]
  })

  const currentLayer = nextLayerId - 1
  const storage = window.localStorage

  useEffect(() => {
    const layerData = JSON.parse(storage.getItem(`layer ${currentLayer}`))
    if (layerData) {
      setFilters({
        isFinancingFilterActive: layerData.isFinancingFilterActive,
        isGovFundsReceivedActive: layerData.isGovFundsReceivedActive,
        patentsFilter: layerData.patentsFilter || [0, 100],
        populationFilter: layerData.populationFilter,
        researchInvestmentFilter: layerData.researchInvestmentFilter || 0,
        lifeQuality: layerData.lifeQuality,
        gnp: layerData.gnp || [0]
      })
    }
  }, [currentLayer])

  return (
    <>
      {layers.map(layer => {
        return (
          <div key={layer.id}>
            <StartupsComponent filters={filters} searchPolygon={searchPolygon} />
            <PatentsLayer filters={filters} searchPolygon={searchPolygon} />
            <PopulationLayer filters={filters} searchPolygon={searchPolygon} />
            <ResearchInvestmentLayer filters={filters} searchPolygon={searchPolygon} />
            <LifeQualityLayer filters={filters} searchPolygon={searchPolygon} />
            <GnpLayer filters={filters} searchPolygon={searchPolygon} />
          </div>
        )
      })}
    </>
  )
}

export default LayersManager
