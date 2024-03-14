/* import { useContext, useEffect, useRef } from "react"
import { CollectionContext } from "@/context/collectionContext"
import { UserContext } from "@/context/userContext"

import * as Plot from "@observablehq/plot"
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner"

function StackPlot() {
  const { collection, setCollection } = useContext(CollectionContext)
  const { user } = useContext(UserContext)
  const containerRef = useRef()

  const data = collection[0]?.data

  console.log(data)

  useEffect(() => {
    if (!data || isLoading || error) return

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
            { order, reverse },
            { x: [1, 100], y: [1, 100], z: "format", fill: "group" }
          )
        ),
        Plot.ruleY([0])
      ]
    })
    containerRef.current.innerHTML = '' // Limpia el contenedor antes de agregar el gráfico
    containerRef.current.appendChild(plot)
  }, [data, isLoading, error])

  if (isLoading) return <LoadingSpinner />
  if (error) return <div>An error has ocurred</div>

  return (
    <div ref={containerRef}></div>
  )
}

export default StackPlot */