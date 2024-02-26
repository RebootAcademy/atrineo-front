import { point, polygon } from '@turf/helpers'
import booleanPointInPolygon from '@turf/boolean-point-in-polygon'

/**
 * Función para verificar si un elemento está dentro de un polígono.
 * @param {Object} dataItem - El elemento a evaluar.
 * @param {Array} searchPolygon - Polígono de búsqueda.
 * @returns {boolean} - Verdadero si el elemento está dentro del polígono.
 */
export const isWithinPolygon = (dataItem, searchPolygon) => {
  if (!searchPolygon || !Array.isArray(searchPolygon) || searchPolygon.length === 0 || !Array.isArray(searchPolygon[0])) return true;

  // Encuentra los objetos de latitud y longitud
  const latObj = dataItem.fields.find(field => field.fieldName === 'latitude')
  const lonObj = dataItem.fields.find(field => field.fieldName === 'longitude')

  // Verifica si ambos están presentes y son válidos
  const hasValidCoordinates = latObj != null && lonObj != null && latObj.fieldValue != null && lonObj.fieldValue != null
  if (!hasValidCoordinates) return false

  // Prepara las coordenadas para la verificación
  const itemCoords = [parseFloat(lonObj.fieldValue), parseFloat(latObj.fieldValue)]
  const itemPoint = point(itemCoords)
  const polygonCoordinates = searchPolygon[0].map(coord => [coord.lng, coord.lat])
  polygonCoordinates.push(polygonCoordinates[0])

  return booleanPointInPolygon(itemPoint, polygon([polygonCoordinates]))
}

export const CalculatePopulationBounds = (data) => {
  const flattenedData = data.flat()
  const populations = flattenedData.flatMap(item =>
    item.data.map(innerItem =>
      innerItem.districtPopulation
    ))

  const validPopulations = populations.filter(value => !isNaN(value))

  const minPopulation = Math.min(...validPopulations)
  const maxPopulation = Math.max(...validPopulations)

  return { minPopulation, maxPopulation }
}

export const CalculateResearchInvestmentBounds = (data) => {
  const flattenedData = data.flat()
  const researchInvestments = flattenedData.flatMap(item =>
    item.data.map(innerItem =>
      innerItem.researchInvestment
    ))

  const validInvestments = researchInvestments.filter(value => !isNaN(value))

  const minResearchInvestment = Math.min(...validInvestments)
  const maxResearchInvestment = Math.max(...validInvestments)

  return { minResearchInvestment, maxResearchInvestment }
}

export const extractNumericFields = (arr) => {
  return arr?.filter(
    (field) =>
      field.fieldType === "number" &&
      field.fieldName !== "latitude" &&
      field.fieldName !== "longitude" &&
      field.fieldName !== "districtId"
  )
}

export const extractStringOptions = (arr) => {
  return arr?.filter(
    (field) =>
      field.fieldType === "string" &&
        field.fieldName !== "name" &&
        field.fieldName !== "latitude" &&
        field.fieldName !== "longitude" &&
        field.fieldName !== "districtName"
  )
    .map((field) => field.fieldName)
}

export const createStringOptionsObject = (arr, data) => {
  const optionsObj = {}

  arr?.forEach(option => {
    optionsObj[option] = new Set()
  })

  data?.forEach(row => {
    row.fields?.forEach(field => {
      if (arr?.includes(field.fieldName)) {
        optionsObj[field.fieldName].add(field.fieldValue)
      }
    })
  })

  for (const [key, value] of Object.entries(optionsObj)) {
    optionsObj[key] = Array.from(value)
  }

  return optionsObj
}

export const findMaxAndMinValues = (arr, name) => {
  const values = arr
    .flatMap((item) => item.fields)
    .filter((field) => field.fieldName === name)
    .map(item => item.fieldValue)
  return [Math.max(...values), Math.min(...values)]
}