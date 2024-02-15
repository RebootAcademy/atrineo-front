import { point, polygon } from "@turf/helpers"
import booleanPointInPolygon from "@turf/boolean-point-in-polygon"

/**
 * Función para verificar si un elemento está dentro de un polígono.
 * @param {Object} dataItem - El elemento a evaluar.
 * @param {Array} searchPolygon - Polígono de búsqueda.
 * @returns {boolean} - Verdadero si el elemento está dentro del polígono.
 */
export const isWithinPolygon = (dataItem, searchPolygon) => {
  if (!searchPolygon || searchPolygon.length === 0) return true

  const hasValidCoordinates = dataItem.latitude != null && dataItem.longitude != null
  if (!hasValidCoordinates) return false

  const itemCoords = [parseFloat(dataItem.longitude), parseFloat(dataItem.latitude)]
  const itemPoint = point(itemCoords)
  const polygonCoordinates = searchPolygon[0].map(coord => [coord.lng, coord.lat])
  polygonCoordinates.push(polygonCoordinates[0])

  return booleanPointInPolygon(itemPoint, polygon([polygonCoordinates]))
}

export const CalculatePopulationBounds = (data) => {
  const populations = data.map(item => item.districtPopulation)
  const minPopulation = Math.min(...populations)
  const maxPopulation = Math.max(...populations)
  return { minPopulation, maxPopulation }
}

export const CalculateResearchInvestmentBounds = (data) => {
  const flattenedData = data.flat()
  const researchInvestments = flattenedData.flatMap(item => item.data.map(innerItem => innerItem.researchInvestment))
  const validInvestments = researchInvestments.filter(value => !isNaN(value))

  const minResearchInvestment = Math.min(...validInvestments)
  const maxResearchInvestment = Math.max(...validInvestments)

  return { minResearchInvestment, maxResearchInvestment }
}
