import { useState, useLayoutEffect } from "react"

export const useDimensions = (targetRef) => {
  console.log(targetRef)
  const [dimensions, setDimensions] = useState({ width: 1300, height: 600 })

  useLayoutEffect(() => {
    if (targetRef.current) {
      const observer = new ResizeObserver((entries) => {
        if (entries[0].target) {
          const { width, height } = entries[0].contentRect
          setDimensions({ width, height })
        }
      })
      observer.observe(targetRef.current)
      return () => observer.disconnect()
    }
  }, [targetRef])

  return dimensions
}