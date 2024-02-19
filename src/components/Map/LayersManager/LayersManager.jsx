import { useContext, useEffect, useState } from "react"
import { LayerContext } from "../../../context/layerContext"
import StartupsComponent from "../StartupsComponent/StartupsComponent"
import PatentsLayer from "../PatentsLayer/PatentsLayer"
import LifeQualityLayer from "../LifeQualityLayer/LifeQualityLayer"
import GnpLayer from "../GnpLayer/GnpLayer"
import PopulationLayer from "../PopulationLayer/PopulationLayer"
import ResearchInvestmentLayer from "../ResearchInvestment/ResearchInvestment"

function LayersManager() {
  const { layers, setLayers } = useContext(LayerContext)

  return (
    <>
      {layers.map(layer => {
        console.log(layer)
        return (
          <div key={layer.id}>
            <StartupsComponent />
            <PatentsLayer />
            <PopulationLayer />
            <ResearchInvestmentLayer />
            <LifeQualityLayer />
            <GnpLayer />
          </div>
        )
      })}
    </>
  )
}

export default LayersManager