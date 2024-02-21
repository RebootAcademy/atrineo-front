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
  const { searchPolygon, layers, setLayers } = useContext(LayerContext)

  useEffect(() => {
    const storedLayers = JSON.parse(window.localStorage.getItem('layers')) || []
    setLayers(storedLayers)
  }, [])

  return (
    <>
      {layers.map((layer, index) => (
        <div key={index}>
          {/* Asumiendo que cada componente de capa puede manejar su propia configuración de filtros */}
          <StartupsComponent filters={layer.data} searchPolygon={searchPolygon} />
          <PatentsLayer filters={layer.data} searchPolygon={searchPolygon} />
          <PopulationLayer filters={layer.data} searchPolygon={searchPolygon} />
          <ResearchInvestmentLayer filters={layer.data} searchPolygon={searchPolygon} />
          <LifeQualityLayer filters={layer.data} searchPolygon={searchPolygon} />
          <GnpLayer filters={layer.data} searchPolygon={searchPolygon} />
        </div>
      ))}
    </>
  )
}

export default LayersManager
