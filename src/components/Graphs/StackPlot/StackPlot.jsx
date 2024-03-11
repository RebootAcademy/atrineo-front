import { useContext, useEffect, useRef } from "react"
import { useQuery } from "react-query"
import { CollectionContext } from "@/context/collectionContext"
import { UserContext } from "@/context/userContext"

import { getPublicCollections } from "@/services/collectionService"

import * as Plot from "@observablehq/plot"

function StackPlot() {
  const { collection, setCollection } = useContext(CollectionContext)
  const { user } = useContext(UserContext)
  const containerRef = useRef()

  useQuery('publicCollections', getPublicCollections, {
    enabled: !!user && Object.keys(user).length > 0 && collection.length === 0 && user.role === 'wizard',
    onSuccess: (data) => {
      if (Object.keys(user).length > 0) {
        setCollection(data.result)
      }
    }
  })

  const data = collection[0]?.data

  console.log(data)

  useEffect(() => {
    if (data === undefined) return
    const plot = Plot.plot({
      y: {
        grid: true,
        label: "↑ Annual revenue (billions, adj.)",
        transform: (d) => d // convert millions to billions
      },
      color: { legend: true },
      marks: [
        Plot.areaY(
          data,
          Plot.stackY(
          /*  { order, reverse }, */
            { x: "districtPopulation", y: "districtPopulation", z: "format", fill: "group" }
          )
        ),
        Plot.ruleY([0])
      ]
    })
    containerRef.current.innerHTML = '' // Limpia el contenedor antes de agregar el gráfico
    containerRef.current.appendChild(plot)
  }, [data])


  return (
    <div ref={containerRef}></div>
  )
}

export default StackPlot