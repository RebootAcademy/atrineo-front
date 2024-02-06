import { createContext, useContext, useState } from 'react'

const MarkersContext = createContext()

export function useMarkers() {
  return useContext(MarkersContext)
}

export const MarkersProvider = ({ children }) => {
  const [showMarkers, setShowMarkers] = useState(false)

  const toggleMarkersDisplay = () => {
    setShowMarkers(!showMarkers)
  }

  return (
    <MarkersContext.Provider value={{ showMarkers, toggleMarkersDisplay }}>
      {children}
    </MarkersContext.Provider>
  )
}